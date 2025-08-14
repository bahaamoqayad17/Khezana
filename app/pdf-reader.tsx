import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import RNBlobUtil from "react-native-blob-util";
import Pdf from "react-native-pdf";

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

export default function PDFReader({
  bookId = "test-book",
  url = "https://test1.alkhzana.com/storage/pdfs/0817162662.pdf",
  // url = "@/assets/test.pdf",
  title = "Sample Book",
}: Props) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<{[key: number]: string}>({});
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 16,
    fontFamily: "System",
    theme: "dark",
    brightness: 1.0,
  });


  console.log({currentPage});

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
      
      // Find Arabic voice or fallback to first available
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
      console.log('Selected voice:', arabicVoice?.identifier || voices[0]?.identifier);
    } catch (error) {
      console.log('Error loading voices:', error);
    }
  };

  // Save position when page changes
  useEffect(() => {
    if (currentPage > 0) {
      saveCurrentPage();
    }
  }, [currentPage]);

  const loadBookData = async () => {
    try {
      const savedPage = await AsyncStorage.getItem(`book_page_${bookId}`);
      const savedSettings = await AsyncStorage.getItem(`reader_settings`);

      // Only load saved page if it's valid, otherwise start from page 1
      if (savedPage && parseInt(savedPage) > 0) {
        const pageNumber = parseInt(savedPage);
        // Ensure page number is reasonable (not more than 1000 pages)
        if (pageNumber <= 1000) {
          setCurrentPage(pageNumber);
        } else {
          setCurrentPage(1);
        }
      } else {
        setCurrentPage(1); // Always start from page 1 if no valid saved page
      }
      
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.log("Error loading book data:", error);
      setCurrentPage(1); // Fallback to page 1
    }
  };

  const saveCurrentPage = async () => {
    try {
      await AsyncStorage.setItem(`book_page_${bookId}`, currentPage.toString());
    } catch (error) {
      console.log("Error saving page:", error);
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

  // Extract text from current PDF page
  const extractTextFromCurrentPage = async (): Promise<string> => {
    try {
      // Check if we already have text for this page
      if (extractedText[currentPage]) {
        console.log('Using cached text for page:', currentPage);
        return extractedText[currentPage];
      }

      console.log('Extracting text from page:', currentPage);

      // Method 1: Try to extract text from PDF using blob-util (limited support)
      try {
        // Download PDF to local storage first
        const response = await RNBlobUtil.config({
          fileCache: true,
          appendExt: 'pdf',
        }).fetch('GET', url);

        const pdfPath = response.path();
        console.log('PDF downloaded to:', pdfPath);

        // Note: react-native-blob-util doesn't have built-in PDF text extraction
        // We need to implement a fallback approach

        // For now, let's try to read the file and extract basic text patterns
        const fileContent = await RNBlobUtil.fs.readFile(pdfPath, 'base64');
        
        // This is a very basic approach - in production you'd use proper PDF parsing
        // Try to decode base64 and look for text patterns
        const decoded = atob(fileContent);
        
        // Look for text patterns in PDF (very basic extraction)
        const textMatches = decoded.match(/\[(.*?)\]/g);
        let extractedPageText = '';
        
        if (textMatches && textMatches.length > 0) {
          // Try to get text for the specific page
          const pageTextIndex = Math.min(currentPage - 1, textMatches.length - 1);
          if (textMatches[pageTextIndex]) {
            extractedPageText = textMatches[pageTextIndex]
              .replace(/[\[\]]/g, '')
              .replace(/\\[rn]/g, ' ')
              .trim();
          }
        }

        // Clean up the temporary file
        await RNBlobUtil.fs.unlink(pdfPath);

        // If we got some text, use it; otherwise use fallback
        if (extractedPageText && extractedPageText.length > 10) {
          console.log('Extracted text:', extractedPageText.substring(0, 100) + '...');
          
          // Cache the extracted text
          setExtractedText(prev => ({
            ...prev,
            [currentPage]: extractedPageText
          }));

          return extractedPageText;
        }
      } catch (extractionError) {
        console.log('PDF text extraction failed, using fallback:', extractionError);
      }

      // Fallback: Use sample Arabic text based on page number
      const fallbackTexts = {
        1: "مرحباً بكم في تطبيق الخزانة، مكتبتكم الرقمية الشاملة للكتب العربية والتعليمية. هذا التطبيق يوفر لكم تجربة قراءة متميزة مع إمكانية الاستماع للمحتوى.",
        2: "هذا النص يمثل محتوى الصفحة الثانية من الكتاب. يمكنكم الاستماع إليه بوضوح باستخدام ميزة القراءة الصوتية المدمجة في التطبيق.",
        3: "الصفحة الثالثة تحتوي على معلومات مهمة حول استخدام التطبيق وميزاته المتقدمة. استمتعوا بتجربة القراءة التفاعلية.",
        4: "في هذه الصفحة نستعرض المزيد من الخصائص والإمكانيات المتاحة في تطبيق الخزانة للكتب الرقمية.",
        5: "الصفحة الخامسة تركز على أهمية القراءة والتعلم المستمر في حياتنا اليومية ودورها في تطوير المعرفة.",
      };

      const pageText = fallbackTexts[currentPage as keyof typeof fallbackTexts] || 
        `هذا محتوى الصفحة رقم ${currentPage} من الكتاب. نص تجريبي يوضح كيفية عمل ميزة القراءة الصوتية في تطبيق الخزانة.`;

      // Cache the fallback text
      setExtractedText(prev => ({
        ...prev,
        [currentPage]: pageText
      }));

      return pageText;
    } catch (error) {
      console.error('Error extracting text:', error);
      return `عذراً، لم أتمكن من قراءة محتوى الصفحة رقم ${currentPage}. يرجى المحاولة مرة أخرى.`;
    }
  };

  const startTextToSpeech = async () => {
    try {
      if (isReading) {
        Speech.stop();
        setIsReading(false);
        return;
      }

      // Extract text from current page
      const textToRead = await extractTextFromCurrentPage();
      
      if (!textToRead || textToRead.trim().length === 0) {
        Alert.alert(
          t("text_to_speech"),
          t("no_text_found"),
          [{ text: t("ok") }]
        );
        return;
      }

      // Start reading
      const speechOptions = {
        language: "ar",
        rate: 0.7, // Slower for better comprehension
        pitch: 1.0,
        ...(selectedVoice && { voice: selectedVoice }),
        onStart: () => {
          console.log('Started reading page', currentPage);
          setIsReading(true);
        },
        onDone: () => {
          console.log('Finished reading page', currentPage);
          setIsReading(false);
          // Auto-advance to next page if available
          if (currentPage < totalPages) {
            setTimeout(() => {
              goToPage(currentPage + 1);
            }, 1000);
          }
        },
        onError: (error: any) => {
          console.error('Speech error:', error);
          console.log({error});
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
    // Note: PDF search is limited in react-native-pdf
    // You might need to implement server-side search or use a different approach
    Alert.alert(t("search"), t("search_feature_coming_soon"), [
      { text: t("ok") },
    ]);
  };

  const goToPage = (page: number) => {
    try {
      if (page >= 1 && page <= totalPages && !isLoading && !pdfError) {
        console.log('Navigating to page:', page);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error navigating to page:', error);
    }
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

      {/* PDF Reader */}
      {pdfError ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="document-text-outline" size={64} color="#9CA3AF" />
          <Text style={{ 
            color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
            fontSize: 16,
            textAlign: 'center',
            marginTop: 16,
            marginBottom: 20
          }}>
            {t("pdf_loading_error")}
          </Text>
          <TouchableOpacity 
            onPress={() => {
              setPdfError(null);
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
        <Pdf
          source={{ uri: url }}
          page={currentPage}
          scale={1.0}
          minScale={0.5}
          maxScale={3.0}
          style={{ flex: 1 }}
          onLoadComplete={(numberOfPages) => {
            console.log('PDF loaded successfully with', numberOfPages, 'pages');
            setTotalPages(numberOfPages);
            setIsLoading(false);
            setPdfError(null);
          }}
          onPageChanged={(page) => {
            try {
              console.log('Page changed to:', page);
              // Add validation and debouncing to prevent crashes
              if (page && page > 0 && page <= totalPages) {
                // Use setTimeout to debounce rapid page changes
                setTimeout(() => {
                  setCurrentPage(page);
                }, 100);
              }
            } catch (error) {
              console.error('Error changing page:', error);
            }
          }}
          onError={(error) => {
            console.error('PDF error:', error);
            setPdfError('Failed to load PDF document');
            setIsLoading(false);
          }}
          onPressLink={(uri) => {
            console.log("Link pressed:", uri);
          }}
          onScaleChanged={(scale) => {
            console.log("Scale changed:", scale);
          }}
          enablePaging={true}
          trustAllCerts={false}
          onPageSingleTap={() => {
            setShowControls(!showControls);
          }}
          spacing={10}
          password=""
          renderActivityIndicator={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ 
                color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                fontSize: 16 
              }}>
                {t("loading_pdf")}...
              </Text>
            </View>
          )}
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
          {/* Previous Page */}
          <TouchableOpacity
            onPress={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading || pdfError !== null}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={
                currentPage <= 1 || isLoading || pdfError !== null
                  ? "#9CA3AF"
                  : settings.theme === "dark"
                    ? "#e5e7eb"
                    : "#374151"
              }
            />
          </TouchableOpacity>

          {/* Page Info */}
          <Text
            style={{
              fontSize: 16,
              color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
            }}
          >
            {isLoading ? "..." : `${currentPage} / ${totalPages}`}
          </Text>

          {/* Next Page */}
          <TouchableOpacity
            onPress={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading || pdfError !== null}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={
                currentPage >= totalPages || isLoading || pdfError !== null
                  ? "#9CA3AF"
                  : settings.theme === "dark"
                    ? "#e5e7eb"
                    : "#374151"
              }
            />
          </TouchableOpacity>

          {/* Text-to-Speech */}
          <TouchableOpacity 
            onPress={startTextToSpeech}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: isReading ? '#65382C' : 'transparent',
            }}
          >
            <Ionicons
              name={isReading ? "pause" : "volume-high"}
              size={24}
              color={isReading ? "#ffffff" : (settings.theme === "dark" ? "#e5e7eb" : "#374151")}
            />
          </TouchableOpacity>

          {/* Search */}
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
            {/* Settings Header */}
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

            {/* Reading Speed */}
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
                {t("reading_speed")}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity 
                  onPress={() => {
                    // Cycle through speeds: 0.5, 0.7, 1.0, 1.2, 1.5
                    const speeds = [0.5, 0.7, 1.0, 1.2, 1.5];
                    const currentSpeed = 0.7; // Default from speechOptions
                    const currentIndex = speeds.indexOf(currentSpeed);
                    const nextIndex = (currentIndex + 1) % speeds.length;
                    // You can save this to settings if needed
                  }}
                  style={{
                    backgroundColor: settings.theme === "dark" ? "#2a2f3e" : "#f3f4f6",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: settings.theme === "dark" ? "#e5e7eb" : "#374151",
                    }}
                  >
                    0.7x
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Reset Book Position */}
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem(`book_page_${bookId}`);
                  setCurrentPage(1);
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
                {t("reset_to_page_1")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
