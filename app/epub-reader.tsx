import { BookmarksList } from "@/components/EPubComponents/AddBookMark";
import { AnnotationsList } from "@/components/EPubComponents/AnnotationsList";
import { SearchList } from "@/components/EPubComponents/SearchList";
import { onShare } from "@/components/EPubComponents/Share";
import CustomSwitch from "@/components/EPubComponents/Switch";
import { TableOfContents } from "@/components/EPubComponents/TableOfContent";
import { Footer } from "@/components/EPubComponents/WithSlider";
import axios from "@/utils/axios";
import {
  Annotation,
  Reader,
  Themes,
  useReader,
} from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
// import { usePreventScreenCapture } from "expo-screen-capture";
import React, { useRef, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Selection = {
  cfiRange: string;
  text: string;
};

const EbupReader = ({
  route: {
    params: { data },
  },
}: any) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSepiaTheme, setIsSepiaTheme] = useState(false);

  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [isModalVisibleThreeDots, setIsModalVisibleThreeDots] = useState(false);
  const nav = useNavigation<any>();
  const {
    goToLocation,
    changeFontSize,
    bookmarks,
    addBookmark,
    removeBookmark,
    getCurrentLocation,
    addAnnotation,
    removeAnnotation,
    annotations,
  } = useReader();

  const location = getCurrentLocation();
  const insets = useSafeAreaInsets();

  // usePreventScreenCapture();

  const increaseFontSize = () => {
    if (currentFontSize < 40) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > 10) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
    }
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const TableOfContent = useRef<BottomSheetModal>(null);
  const searchListRef = useRef<BottomSheetModal>(null);

  const [selection, setSelection] = React.useState<Selection | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);
  const annotationsListRef = React.useRef<BottomSheetModal>(null);

  const handleThemeChange = (color: string) => {
    if (color === "black") {
      setIsDarkTheme(true);
      setIsSepiaTheme(false);
    } else if (color === "#fff2e4") {
      setIsDarkTheme(false);
      setIsSepiaTheme(true);
    } else if (color === "white") {
      setIsDarkTheme(false);
      setIsSepiaTheme(false);
    }
  };

  const handleBookDetails = () => {
    nav.navigate("BookDetail", { book_id: data.id });
  };

  const handleAddBookmark = async () => {
    if (!location) return;

    const bookmarkExists = bookmarks.some(
      (bookmark) =>
        bookmark.location.start.cfi === location.start.cfi &&
        bookmark.location.end.cfi === location.end.cfi
    );

    if (bookmarkExists) {
      const bookmark = bookmarks.find(
        (bookmark) =>
          bookmark.location.start.cfi === location.start.cfi &&
          bookmark.location.end.cfi === location.end.cfi
      );
      if (bookmark) {
        await removeBookmark(bookmark);
        Alert.alert("Bookmark removed");
      }
    } else {
      await addBookmark(location);
      Alert.alert("Bookmark added");
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.headerContainer}>
        {/* زر الرجوع */}
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => nav.goBack()}
        >
          <Ionicons name="arrow-back-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>

        {/* الأزرار الأخرى */}
        <View style={styles.iconGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => TableOfContent.current?.present()}
          >
            <AntDesign name="bars" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => annotationsListRef.current?.present()}
          >
            <MaterialCommunityIcons
              name="format-color-highlight"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => searchListRef.current?.present()}
          >
            <Ionicons name="search" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleAddBookmark}
          >
            <Ionicons name="bookmark-outline" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsModalVisibleThreeDots(!isModalVisibleThreeDots)}
          >
            <Ionicons name="options-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisibleThreeDots}
        onRequestClose={() => {
          setIsModalVisibleThreeDots(!isModalVisibleThreeDots);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => onShare(data, {}, {})}
            >
              <Entypo name="share" size={24} color="#fff" />
              <Text style={styles.modalOptionText}>مشاركة رابط الكتاب</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleBookDetails}
            >
              <Ionicons name="book" size={24} color="#fff" />
              <Text style={styles.modalOptionText}>تفاصيل الكتاب</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => bottomSheetRef.current?.present()}
            >
              <Ionicons name="bookmark" size={24} color="#fff" />
              <Text style={styles.modalOptionText}>علامات مرجيعة</Text>
            </TouchableOpacity>
            <View style={styles.section}>
              <Text style={styles.txt}>الوضع</Text>
              <CustomSwitch onValueChange={handleThemeChange} />
            </View>
            <View style={styles.section}>
              <Text style={styles.txt}>تغيير حجم الخط</Text>
              <View style={styles.fontSizeContainer}>
                <AntDesign
                  onPress={increaseFontSize}
                  name="pluscircleo"
                  size={24}
                  color="black"
                />
                <Text style={styles.fontSizeText}>{currentFontSize}</Text>
                <AntDesign
                  onPress={decreaseFontSize}
                  name="minuscircleo"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setIsModalVisibleThreeDots(!isModalVisibleThreeDots)
              }
            >
              <Text style={styles.closeButtonText}>اغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Reader
        src={`https://alkhzana.com/public/storage/${data.book_pdf}`}
        fileSystem={useFileSystem}
        waitForLocationsReady
        enableSelection
        onLocationChange={(currentLocation: any) => {
          axios
            .post(`add/user/is/subscribed/page/reader`, {
              book_id: data.id,
              page_number: currentLocation?.start?.displayed?.page || 1,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err: any) => {
              console.error(err.response.data);
            });
        }}
        //flow='scrolled-continuous'
        allowScriptedContent
        allowPopups
        snap
        spread="auto"
        keepScrollOffsetOnLocationChange
        onAddBookmark={(bookmark) => console.log("onAddBookmark", bookmark)}
        onRemoveBookmark={(bookmark) =>
          console.log("onRemoveBookmark", bookmark)
        }
        onUpdateBookmark={(bookmark) =>
          console.log("onUpdateBookmark", bookmark)
        }
        onChangeBookmarks={(bookmarks) =>
          console.log("onChangeBookmarks", bookmarks)
        }
        defaultTheme={
          isDarkTheme ? Themes.DARK : isSepiaTheme ? Themes.SEPIA : Themes.LIGHT
        }
        onWebViewMessage={(message) => {
          if (message.type === "onCfiFromPercentage") {
            goToLocation(message.cfi);
          }
        }}
        initialLocation="introduction_001.xhtml"
        initialAnnotations={[
          // Chapter 1
          {
            cfiRange: "epubcfi(/6/10!/4/2/4,/1:0,/1:319)",
            data: {},
            sectionIndex: 4,
            styles: { color: "#23CE6B" },
            cfiRangeText:
              "The pale Usher—threadbare in coat, heart, body, and brain; I see him now. He was ever dusting his old lexicons and grammars, with a queer handkerchief, mockingly embellished with all the gay flags of all the known nations of the world. He loved to dust his old grammars; it somehow mildly reminded him of his mortality.",
            type: "highlight",
          },
          // Chapter 5
          {
            cfiRange: "epubcfi(/6/22!/4/2/4,/1:80,/1:88)",
            data: {},
            sectionIndex: 3,
            styles: { color: "#CBA135" },
            cfiRangeText: "landlord",
            type: "highlight",
          },
        ]}
        onAddAnnotation={(annotation) => {
          if (annotation.type === "highlight" && annotation.data?.isTemp) {
            setTempMark(annotation);
          }
        }}
        onPressAnnotation={(annotation) => {
          setSelectedAnnotation(annotation);
          annotationsListRef.current?.present();
        }}
        onChangeAnnotations={(annotation) => {
          console.log("onChangeAnnotations", annotation);
        }}
        menuItems={[
          {
            label: "🟡",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: "#CBA135",
              });
              return true;
            },
          },
          {
            label: "🔴",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: "#23CE6B",
              });
              return true;
            },
          },
          {
            label: "🟢",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: "#000000",
              });
              return true;
            },
          },
          {
            label: "Add Note",
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation("highlight", cfiRange, { isTemp: true });
              annotationsListRef.current?.present();
              return true;
            },
          },
        ]}
      />
      <BookmarksList
        ref={bottomSheetRef}
        onClose={() => bottomSheetRef.current?.dismiss()}
      />
      <SearchList
        ref={searchListRef}
        onClose={() => searchListRef.current?.dismiss()}
      />
      <TableOfContents
        ref={TableOfContent}
        onPressSection={(section) => {
          goToLocation(section.href.split("/")[1]);
          bottomSheetRef.current?.dismiss();
        }}
        onClose={() => TableOfContent.current?.dismiss()}
      />
      <AnnotationsList
        ref={annotationsListRef}
        selection={selection}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        onClose={() => {
          setTempMark(null);
          setSelection(null);
          setSelectedAnnotation(undefined);
          if (tempMark) removeAnnotation(tempMark);
          annotationsListRef.current?.dismiss();
        }}
      />
      <Footer />
    </GestureHandlerRootView>
  );
};

export default EbupReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D1935E",
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 5,
  },
  headerButton: {
    padding: 10,
    borderRadius: 50,
  },
  iconGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%", // تخصيص عرض للأيقونات
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },

  txt: {
    fontSize: 15,
    color: "#000",
    fontFamily: "Cairo-Bold",
    alignSelf: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  fontSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  fontSizeText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  closeButton: {
    backgroundColor: "#D1935E",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Cairo-Bold",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  modalOption: {
    padding: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#D1935E",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalOptionText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Cairo-Regular",
  },
  section: {
    width: "90%",
    alignSelf: "center",
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
