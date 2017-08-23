const client = new stitch.StitchClient('helloworld-qqota');
const db = client.service('mongodb', 'mongodb-atlas').db('quizapp');

function displayQuestionsOnLoad() {
 client.login().then(displayQuestions);
}

function displayQuestions() {
 db.collection('questions').find({}).then(docs => {
     var html = docs.map(c => "<div class='col'>" + c.question + '</br><input type="button" name="'+ c.question + '"  onClick="getAnswer(\''+ c.question + '\', \'true\')" class="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal" value="True"><input type="button" name="'+ c.question + '" onClick="getAnswer(\''+ c.question +'\', \'false\')" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" value="False">' + "</div>").join("");
     document.getElementById("questions").innerHTML = html;
 });
}

function getAnswer(question, buttonvalue) {
var lookupkey = question;

 db.collection('questions').find({question:lookupkey}).then(docs => {
     var answer = docs.map(c => c.answer).join("");

     if (buttonvalue == answer){
        alert("Correct");
    }else {
        alert("Incorrect");
    }
 });
}

function addQuestion() {
 var foo = document.getElementById("new_question");
 var bar = document.getElementsByName('truefalse');
 db.collection("questions").insert({owner_id : client.authedId(), question: foo.value, answer: bar[0].checked}).then(displayQuestions);
 foo.value = "";
}