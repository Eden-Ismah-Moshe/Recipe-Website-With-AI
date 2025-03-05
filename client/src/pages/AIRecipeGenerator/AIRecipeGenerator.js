import React, { useState } from "react";
import axios from "axios";

const tempRecipeText = `בטח! הנה מתכון פשוט וטעים עם עגבניות וגבינה צהובה:

**טוסט עגבניות וגבינה משודרג**

**מרכיבים:**

*   2 פרוסות לחם (מומלץ לחם מחמצת או לחם כפרי)
*   1 עגבנייה גדולה, פרוסה לפרוסות דקות
*   50 גרם גבינה צהובה מגוררת (אפשר גבינת עמק, גאודה, צ'דר או תערובת)
*   1 שן שום כתושה (אופציונלי)
*   1 כף שמן זית
*   אורגנו יבש או בזיליקום יבש (אופציונלי)
*   מלח ופלפל שחור לפי הטעם

**הוראות:**

1. **הכנה מוקדמת:** חממו תנור ל-180 מעלות צלזיוס.
2. **הכנת הלחם:** מרחו קלות את פרוסות הלחם בשמן זית. אם רוצים, שפשפו מעט שום כתוש על הלחם.
3. **סידור הטוסט:** הניחו את פרוסות העגבנייה על הלחם. פזרו מעל העגבניות מלח, פלפל ואורגנו/בזיליקום יבש.
4. **גבינה:** פזרו בנדיבות גבינה צהובה מגוררת מעל העגבניות.
5. **אפייה:** הניחו את הטוסטים על תבנית מרופדת בנייר אפייה והכניסו לתנור החם. אפו במשך 8-10 דקות, או עד שהגבינה נמסה ומזהיבה והלחם קלוי.
6. **הגשה:** הוציאו מהתנור, תנו לטוסטים להתקרר מעט, וחתכו אותם לחצי. מגישים מיד.

**טיפים ושדרוגים:**

*   **ירקות נוספים:** אפשר להוסיף פרוסות דקות של בצל סגול, פלפל קלוי או זיתים.
*   **רטבים:** מריחה קלה של פסטו, ממרח עגבניות מיובשות או ממרח עשבי תיבול יכולה לשדרג את הטעם.
*   **גבינות אחרות:** נסו לשלב גבינות אחרות כמו מוצרלה, גבינת עיזים או גבינה בולגרית מפוררת.
*   **חריף:** אם אתם אוהבים חריף, אפשר להוסיף קצת פלפל צ'ילי גרוס או כמה טיפות של רוטב חריף.

בתאבון!`;

const AIRecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("בוקר");
  const [time, setTime] = useState("");
  const [recipeText, setRecipeText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-recipe",
        {
          message: `הכנת מנה ${mealType} עם ${ingredients} וזמן הכנה של ${time} ד
          קות`,
        }
      );
      setRecipeText(response.data.reply);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  const renderText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // אם יש מספור/רשימה והדגשה באותה השורה
      if (line.match(/^\d+\./) || line.startsWith("*   **")) {
        // קודם כל מחלקים את הטקסט לפי ההדגשה
        const parts = line.split("**");
        console.log("parts: ", parts);
        // אם יש הדגשה
        if (parts.length > 1) {
          return (
            <>
              {" "}
              {line.startsWith("*") ? (
                <li key={index} className="list-disc pl-5">
                  <span className="font-bold">{parts[1]}</span>
                  {parts.slice(2).join("**")}
                </li>
              ) : (
                <p key={index} className="ml-4">
                  <span>{parts[0]}</span>
                  <span className="font-bold">{parts[1]}</span>
                  {parts.slice(2).join("**")}
                </p>
              )}
            </>
          );
        } else {
          return (
            <p key={index} className="ml-4">
              {line}
            </p>
          );
        }
      }

      // אם יש הדגשה בלבד (למשל **מרכיבים**)
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-bold text-lg">
            {line.slice(2, -2)}
          </p>
        );
      }

      // אם יש סימני * (כדי להפוך לרשימה עם bullet)
      if (line.startsWith("*")) {
        return (
          <li key={index} className="list-disc pl-5">
            {line.slice(2)}
          </li>
        );
      }

      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">
        :AI קבלת מתכון בעזרת
      </h2>
      <form onSubmit={handleSubmit} dir="rtl" className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-right mb-2">רכיבים:</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-right mb-2">סוג הארוחה:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          >
            <option value="בוקר">בוקר</option>
            <option value="צהריים">צהריים</option>
            <option value="ערב">ערב</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-right mb-2">זמן (בדקות):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          קבלת מתכון
        </button>
      </form>

      {recipeText && (
        <div className="max-w-3xl mx-auto p-4" dir="rtl">
          {renderText(recipeText)}
        </div>
      )}
    </div>
  );
};

export default AIRecipeGenerator;
