import { Alert, Share } from "react-native";

export const onShare = async (book: any, author: any, publisher: any) => {
  try {
    // نص الرابط المشترك (استخدم رابط URL صالح)
    const message = `${book?.book_title} - ${author?.author_name} - ${publisher?.publisher_name} - 
        \nhttps://alkhzana.com/book/${book.id}`;

    const result = await Share.share({
      message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("تمت المشاركة مع نوع النشاط:", result.activityType);
      } else {
        console.log("تمت المشاركة بنجاح");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("تم رفض المشاركة");
    }
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};
