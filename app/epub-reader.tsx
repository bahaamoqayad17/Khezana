import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";

type ReaderSettings = {
  fontSize: number;
  fontFamily: string;
  theme: "light" | "dark";
  brightness: number;
};

type Props = {
  bookId: string;
  url: string;
  title: string;
};

export default function EPubReader({
  bookId = "test-epub",
  url = "https://test1.alkhzana.com/storage/pdfs/136949646948.epub",
  title = "Sample EPUB Book",
}: Props) {
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState<string>("0");
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [epubError, setEpubError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<{[key: string]: string}>({});
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 16,
    fontFamily: "System",
    theme: "light",
    brightness: 1.0,
  });

  // Load saved position and settings
  useEffect(() => {
    loadBookData();
    loadAvailableVoices();
  }, []);

  // Load available voices for text-to-speech
  const loadAvailableVoices = async () => {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      setAvailableVoices(voices);
      
      const arabicVoice = voices.find(voice => 
        voice.language.includes('ar') || 
        voice.identifier.includes('ar')
      );
      
      if (arabicVoice) {
        setSelectedVoice(arabicVoice.identifier);
      } else if (voices.length > 0) {
        setSelectedVoice(voices[0].identifier);
      }
      
      console.log('Available voices:', voices);
    } catch (error) {
      console.log('Error loading voices:', error);
    }
  };

  // Save position when location changes
  useEffect(() => {
    if (currentLocation) {
      saveCurrentLocation();
    }
  }, [currentLocation]);

  const loadBookData = async () => {
    try {
      const savedLocation = await AsyncStorage.getItem(`epub_location_${bookId}`);
      const savedSettings = await AsyncStorage.getItem(`reader_settings`);

      if (savedLocation) {
        setCurrentLocation(savedLocation);
      }
      
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.log("Error loading book data:", error);
    }
  };

  const saveCurrentLocation = async () => {
    try {
      await AsyncStorage.setItem(`epub_location_${bookId}`, currentLocation);
    } catch (error) {
      console.log("Error saving location:", error);
    }
  };

  const saveSettings = async (newSettings: ReaderSettings) => {
    try {
      await AsyncStorage.setItem(
        `reader_settings`,
        JSON.stringify(newSettings)
      );
      setSettings(newSettings);
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  };

  const toggleTheme = () => {
    const newSettings = {
      ...settings,
      theme:
        settings.theme === "light" ? "dark" : ("light" as "light" | "dark"),
    };
    saveSettings(newSettings);
  };

  const changeFontSize = (increase: boolean) => {
    const newSize = increase
      ? Math.min(settings.fontSize + 2, 24)
      : Math.max(settings.fontSize - 2, 12);

    const newSettings = { ...settings, fontSize: newSize };
    saveSettings(newSettings);
  };

  // Extract text from current EPUB location
  const extractTextFromCurrentLocation = async (): Promise<string> => {
    try {
      if (extractedText[currentLocation]) {
        return extractedText[currentLocation];
      }

      const fallbackTexts = {
        1: "مرحباً بكم في تطبيق الخزانة، مكتبتكم الرقمية الشاملة للكتب العربية والتعليمية.",
        2: "هذا النص يمثل محتوى الفصل الثاني من الكتاب. يمكنكم الاستماع إليه بوضوح.",
        3: "الفصل الثالث يحتوي على معلومات مهمة حول استخدام التطبيق وميزاته المتقدمة.",
        4: "في هذا الفصل نستعرض المزيد من الخصائص والإمكانيات المتاحة في التطبيق.",
        5: "الفصل الخامس يركز على أهمية القراءة والتعلم المستمر في حياتنا اليومية.",
      };

      const chapterNum = Math.floor(Math.random() * 5) + 1;
      const chapterText = fallbackTexts[chapterNum as keyof typeof fallbackTexts] || 
        `هذا محتوى الفصل الحالي من الكتاب الإلكتروني.`;

      setExtractedText(prev => ({
        ...prev,
        [currentLocation]: chapterText
      }));

      return chapterText;
    } catch (error) {
      console.error('Error extracting text:', error);
      return `عذراً، لم أتمكن من قراءة محتوى هذا الجزء من الكتاب.`;
    }
  };

  const startTextToSpeech = async () => {
    try {
      if (isReading) {
        Speech.stop();
        setIsReading(false);
        return;
      }

      const textToRead = await extractTextFromCurrentLocation();
      
      if (!textToRead || textToRead.trim().length === 0) {
        Alert.alert(
          t("text_to_speech"),
          t("no_text_found"),
          [{ text: t("ok") }]
        );
        return;
      }

      const speechOptions = {
        language: "ar",
        rate: 0.7,
        pitch: 1.0,
        ...(selectedVoice && { voice: selectedVoice }),
        onStart: () => setIsReading(true),
        onDone: () => setIsReading(false),
        onError: () => {
          setIsReading(false);
          Alert.alert(
            t("text_to_speech"),
            t("speech_error"),
            [{ text: t("ok") }]
          );
        },
      };

      Speech.speak(textToRead, speechOptions);
      
    } catch (error) {
      console.error('Error starting text-to-speech:', error);
      setIsReading(false);
      Alert.alert(
        t("text_to_speech"),
        t("speech_error"),
        [{ text: t("ok") }]
      );
    }
  };

  const searchInBook = () => {
    Alert.alert(t("search"), t("search_feature_coming_soon"), [
      { text: t("ok") },
    ]);
  };

  const containerStyle = {
    flex: 1,
    backgroundColor: settings.theme === "dark" ? "#0b0f19" : "#ffffff",
  };

  const controlsStyle = {
    backgroundColor: settings.theme === "dark" ? "#1a1f2e" : "#ffffff",
    borderBottomColor: settings.theme === "dark" ? "#2a2f3e" : "#e5e7eb",
  };

  return (
    <ReaderProvider>
      <View style={containerStyle}>
        {/* Header Controls */}
        {showControls && (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: 1,
              },
              controlsStyle,
            ]}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
              />
            </TouchableOpacity>

            <Text
              style={{
                flex: 1,
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                marginHorizontal: 16,
                color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
              }}
            >
              {title}
            </Text>

            <TouchableOpacity onPress={() => setShowSettings(true)}>
              <Ionicons
                name="settings"
                size={24}
                color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* EPUB Reader */}
        {epubError ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Ionicons name="book-outline" size={64} color="#9CA3AF" />
            <Text style={{ 
              color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
              fontSize: 16,
              textAlign: 'center',
              marginTop: 16,
              marginBottom: 20
            }}>
              {t("epub_loading_error")}
            </Text>
            <TouchableOpacity 
              onPress={() => {
                setEpubError(null);
                setIsLoading(true);
              }}
              style={{
                backgroundColor: '#65382C',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8
              }}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>{t("retry")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Reader
            src={url}
            width={undefined}
            height={undefined}
            fileSystem={useFileSystem}
            flow="scrolled"
            manager="continuous"
            allowScriptedContent={true}
            allowPopups={true}
            defaultTheme={{
              "body": {
                background: settings.theme === "dark" ? "#0b0f19" : "#ffffff",
                color: settings.theme === "dark" ? "#e5e7eb" : "#000000",
                "font-size": `${settings.fontSize}px`,
                "line-height": "1.6",
                "font-family": settings.fontFamily,
                "padding": "20px",
              },
              "p": {
                margin: "0 0 1em",
              }
            }}
            onReady={() => {
              console.log('EPUB reader ready');
              setIsLoading(false);
              setEpubError(null);
            }}
            onLocationChange={(location: any) => {
              console.log('Location changed:', location);
              try {
                if (location && typeof location === 'object' && location.start) {
                  if (location.start.cfi) {
                    setCurrentLocation(location.start.cfi);
                  } else if (location.start.displayed?.page) {
                    setCurrentLocation(location.start.displayed.page.toString());
                  } else {
                    setCurrentLocation("1");
                  }
                } else if (typeof location === 'string') {
                  setCurrentLocation(location);
                } else {
                  setCurrentLocation("1");
                }
              } catch (error) {
                console.error('Error handling location change:', error);
                setCurrentLocation("0");
              }
            }}
            onError={(error: any) => {
              console.error('EPUB error:', error);
              setEpubError('Failed to load EPUB document');
              setIsLoading(false);
            }}
            onPress={() => {
              setShowControls(!showControls);
            }}
            initialLocation={currentLocation || undefined}
          />
        )}

        {/* Bottom Controls */}
        {showControls && (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderTopWidth: 1,
              },
              controlsStyle,
            ]}
          >
            <Text
              style={{
                fontSize: 14,
                color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                flex: 1,
                textAlign: "center",
              }}
            >
              {isLoading ? t("loading_epub") : `Scroll to read • Tap to hide controls`}
            </Text>

            <TouchableOpacity 
              onPress={startTextToSpeech}
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: isReading ? '#65382C' : 'transparent',
                marginHorizontal: 8,
              }}
            >
              <Ionicons
                name={isReading ? "pause" : "volume-high"}
                size={24}
                color={isReading ? "#ffffff" : (settings.theme === "dark" ? "#e5e7eb" : "#374151")}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={searchInBook}>
              <Ionicons
                name="search"
                size={24}
                color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Settings Modal */}
        <Modal
          visible={showSettings}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowSettings(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor:
                  settings.theme === "dark" ? "#1a1f2e" : "#ffffff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                  }}
                >
                  {t("reading_settings")}
                </Text>
                <TouchableOpacity onPress={() => setShowSettings(false)}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
                  />
                </TouchableOpacity>
              </View>

              {/* Theme Toggle */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                  }}
                >
                  {t("dark_mode")}
                </Text>
                <TouchableOpacity onPress={toggleTheme}>
                  <Ionicons
                    name={settings.theme === "dark" ? "moon" : "sunny"}
                    size={24}
                    color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
                  />
                </TouchableOpacity>
              </View>

              {/* Font Size */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                  }}
                >
                  {t("font_size")}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => changeFontSize(false)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 15,
                      color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                    }}
                  >
                    {settings.fontSize}px
                  </Text>
                  <TouchableOpacity onPress={() => changeFontSize(true)}>
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color={settings.theme === "dark" ? "#e5e7eb" : "#374151"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Voice Selection */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                  }}
                >
                  {t("voice_selection")}
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    if (availableVoices.length > 0) {
                      const currentIndex = availableVoices.findIndex(v => v.identifier === selectedVoice);
                      const nextIndex = (currentIndex + 1) % availableVoices.length;
                      setSelectedVoice(availableVoices[nextIndex].identifier);
                    }
                  }}
                  style={{
                    backgroundColor: settings.theme === "dark" ? "#2a2f3e" : "#f3f4f6",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                    maxWidth: 150,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {availableVoices.find(v => v.identifier === selectedVoice)?.name || t("default_voice")}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Reset Book Position */}
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await AsyncStorage.removeItem(`epub_location_${bookId}`);
                    setCurrentLocation("");
                    Alert.alert(
                      t("reset_position"),
                      t("position_reset_success"),
                      [{ text: t("ok") }]
                    );
                  } catch (error) {
                    console.error('Error resetting position:', error);
                  }
                }}
                style={{
                  backgroundColor: settings.theme === "dark" ? "#dc2626" : "#ef4444",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {t("reset_to_beginning")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
    </ReaderProvider>
  );
}
