import { NextResponse } from 'next/server';

export async function GET(request) {
    // קבל את הפרמטרים מה-URL
    const { searchParams } = new URL(request.url);
    const emailID = searchParams.get('id'); // מזהה המייל
    
    if (!emailID) {
        return NextResponse.json({ success: false, message: "No email ID provided" }, { status: 400 });
    }

    // שמירת המידע (לדוגמה, בקובץ לוגים או מסד נתונים)
    console.log(`Email ID ${emailID} was opened at ${new Date().toISOString()}`);

    // השב בתגובה לתמונה ריקה
    return new Response('', {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
            'Content-Length': '0',
        },
    });
}
