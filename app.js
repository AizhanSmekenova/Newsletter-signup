const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

const apikey = "193371b5790ceea64b18948adc443feb-us17";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");

})

app.post("/", (req, res) => {
  const fName = req.body.firstName;
  const sName = req.body.secondname;
  const email = req.body.email;

  client.setConfig({
    apiKey: "193371b5790ceea64b18948adc443feb-us17",
    server: "us17",
  });


  async function run() {
  try {
    const response = await client.lists.addListMember("3cf661bc52", {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: sName
      }


    });
    console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
res.sendFile(__dirname + "/success.html");
}
catch (e) {
  console.log(e.status);
  res.sendFile(__dirname + "/failure.html");
}

  };
run();

app.post("/failure", (req, res) => {
  res.redirect("/");
})
// const data = {
//   members: [
//     {
//       email_address: email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: fName,
//         LNAME: sName
//       }
//     }
//   ]
// }
//
// const jsonData = JSON.stringify(data);
// console.log(jsonData);
// const url = "https://us17.api.mailchimp.com/3.0/lists/3cf661bc52/members";
// // const url = "https://us17.admin.mailchimp.com/lists/3cf661bc52/members";
//
// const options = {
//   method: "POST",
//   // auth: ["user", "193371b5790ceea64b18948adc443feb-us17"]
//   auth: "aizhan:193371b5790ceea64b18948adc443feb-us17"
// }
//
// const request = https.request(url, options, (response) => {
//   if(response.ok) {
//     response.on("data", (data) => {
//       console.log( JSON.parse(data) );
//     })
//   } else console.log("response is not ok");
//
// });
// //
// request.write(jsonData);
// request.end();
//

})



//API key
// 193371b5790ceea64b18948adc443feb-us17

// List
// 3cf661bc52
// 3cf661bc52


app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});



//
// const client = require("mailchimp-marketing");
//
// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });
//
// const run = async () => {
//   const response = await client.lists.createListMemberNote(
//     "list_id",
//     "subscriber_hash",
//     {}
//   );
//   console.log(response);
// };
//
// run();
