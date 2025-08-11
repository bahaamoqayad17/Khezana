// components/UpdateGuard.tsx
import SplashScreenComponent from "@/components/SplashScreen";
import * as Application from "expo-application";
import { router } from "expo-router";
import * as Updates from "expo-updates";
import React, { useEffect, useRef, useState } from "react";

type RemoteConfig = {
  minVersion?: string;
  minBuild?: number;
  requiredRuntimeVersion?: string; // for EAS Updates (optional)
};

type Props = {
  children: React.ReactNode;
  /** If true, render children while checking (may cause a tiny flash before redirect). */
  renderWhileChecking?: boolean; // default: false (no flash, but blank for a split second)
};

export default function UpdateGuard({
  children,
  renderWhileChecking = false,
}: Props) {
  const [checked, setChecked] = useState(false);
  const navigatedRef = useRef(false);

  const version = Application.nativeApplicationVersion ?? "0.0.0";
  const build = Number(Application.nativeBuildVersion ?? "0");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        // 1) fetch remote constraints
        const res = await fetch("https://api.easypay.ma/api/v1/app/config", {
          cache: "no-store",
        });
        const cfg: RemoteConfig = await res.json();

        // 2) (optional) EAS runtime hard gate — try OTA silently
        if (cfg.requiredRuntimeVersion && Updates.runtimeVersion) {
          if (cfg.requiredRuntimeVersion !== Updates.runtimeVersion) {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
              await Updates.fetchUpdateAsync();
              await Updates.reloadAsync(); // will remount and run guard again
              return;
            }
            // no compatible OTA; redirect to update page
            if (!cancelled && !navigatedRef.current) {
              navigatedRef.current = true;
              router.replace("/update");
            }
            return;
          }
        }

        // 3) store-based gates (semantic version / build)
        const needsByVersion = cfg.minVersion
          ? compareSemver(version, cfg.minVersion) < 0
          : false;
        const needsByBuild =
          cfg.minBuild != null ? build < cfg.minBuild : false;

        if (needsByVersion || needsByBuild) {
          if (!cancelled && !navigatedRef.current) {
            navigatedRef.current = true;
            router.replace("/update");
          }
          return;
        }
      } catch {
        // Silent fail: do nothing; just continue to app.
      } finally {
        if (!cancelled) setChecked(true);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [version, build]);

  // No UI while checking. Either:
  // - return null (no flash) until first check completes, OR
  // - render children immediately (possible brief flash before redirect)
  if (!checked && !renderWhileChecking) return <SplashScreenComponent />;

  return <>{children}</>;
}

function compareSemver(a: string, b: string): number {
  const pa = a.split(".").map((n) => parseInt(n || "0", 10));
  const pb = b.split(".").map((n) => parseInt(n || "0", 10));
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const x = pa[i] ?? 0;
    const y = pb[i] ?? 0;
    if (x > y) return 1;
    if (x < y) return -1;
  }
  return 0;
}
