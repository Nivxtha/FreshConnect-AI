import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());



// ================= GEMINI =================


if(process.env.GEMINI_API_KEY){

    console.log("ԣ� Gemini API Key Loaded");

}
else{

    console.log("��� Gemini API Key Missing");

}



const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



const model = genAI.getGenerativeModel({

    model:"gemini-2.0-flash"

});






// ================= MYSQL =================


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true
    }
});





db.connect((err)=>{


    if(err){

        console.log("��� MySQL Connection Failed");

        console.log(err.message);

    }

    else{

        console.log("ԣ� MySQL Connected Successfully");

    }


});






// ================= HOME =================


app.get("/",(req,res)=>{

    res.send("���� FreshConnect Backend Running");

});









// ================= AI CHATBOT =================


app.post("/ask-ai",async(req,res)=>{


try{


const {question}=req.body;



if(!question){

return res.status(400).json({

error:"Question required"

});

}





const prompt = `

You are FreshConnect AI Assistant.

Help college freshers.

Topics:

Events,
Clubs,
Faculty,
Timetable,
College Facilities.


Question:

${question}


Answer simply.

`;





const result = await model.generateContent(prompt);



const answer = result.response.text();



res.json({

answer

});



}



catch(error){


console.log("���� Gemini Error");

console.log(error.message);





// FALLBACK RESPONSE



const q = req.body.question.toLowerCase();



let answer="";




if(q.includes("event")){


answer =
"���� FreshConnect campus events include workshops, hackathons, seminars and cultural activities. Visit the Events section to register for upcoming events.";

}



else if(q.includes("club")){


answer =
"��Ļ FreshConnect provides different student clubs including technical, AI, coding and cultural clubs. Check the Clubs section for details.";

}



else if(q.includes("faculty")){


answer =
"�����쭃Ž Faculty information is available in the Faculty section. You can view faculty name, department and email details.";

}



else if(q.includes("timetable")){


answer =
"���� You can find your class schedule in the Timetable section of FreshConnect.";

}



else{


answer =
"���� Hi! I am FreshConnect AI Assistant. I can help you with events, clubs, faculty and timetable.";

}




res.json({

answer

});



}



});









// ================= EVENTS =================


app.get("/events",(req,res)=>{


db.query(

"SELECT * FROM events",

(err,result)=>{


if(err){

return res.status(500).json({

error:err.message

});

}


res.json(result);


});


});









// ================= CLUBS =================


app.get("/clubs",(req,res)=>{


db.query(

"SELECT * FROM clubs",

(err,result)=>{


if(err){

return res.status(500).json({

error:err.message

});

}


res.json(result);


});


});









// ================= FACULTY =================


app.get("/faculty",(req,res)=>{


db.query(

"SELECT * FROM faculty",

(err,result)=>{


if(err){

return res.status(500).json({

error:err.message

});

}


res.json(result);


});


});









// ================= TIMETABLE =================


app.get("/timetable",(req,res)=>{


db.query(

"SELECT * FROM timetable",

(err,result)=>{


if(err){

return res.status(500).json({

error:err.message

});

}


res.json(result);


});


});









// ================= EVENT REGISTRATION =================


app.post("/register",(req,res)=>{


console.log("���� REGISTER ROUTE HIT");


console.log(req.body);



const {

name,

email,

event

}=req.body;





if(!name || !email || !event){


return res.status(400).json({

message:"Missing registration details"

});


}






const sql = `

INSERT INTO registrations

(student_name,event_name,email)

VALUES(?,?,?)

`;






db.query(

sql,

[

name,

event,

email

],


(err,result)=>{


if(err){

console.log("��� MYSQL INSERT ERROR");

console.log(err.message);


return res.status(500).json({

message:err.message

});


}





console.log("ԣ� Registration Saved");



res.json({

message:"Registration Successful",

id:result.insertId

});



}



);


});











// ================= SERVER =================


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`���� Server running on port ${PORT}`);
});
