<html>
<head>
<script>
var total_questions = 7;

function init() {
  let x = http_get('task3.grade?' + fresh());
  document.getElementById('declare').style.display = 'block';
  for (var i = 0; i < total_questions; ++i) {
    init_question(i);
  }

  let submitted = JSON.parse(http_get('task3.submitted?' + fresh()));
  for (var i = 0; i < total_questions; ++i) {
    show_submitted(i, submitted[i]);
  }

}

function submit() {
  document.getElementById('possible_error').innerHTML = 'submitting...'
  var form = document.getElementById('answers');
  var result = [];
  console.log(JSON.stringify(form));
  for (var i = 0; i < total_questions; ++i) {
    result.push(get_response(i));
  }
  var quiz = form.getAttribute('name');
  var to_send = {
    result: result,
    quiz: quiz,
    practice: false,
    total_questions: 7,
    retry: true,
    instant: false,
    warnzero: true,
    duebefore: '2021-04-11 16:00',
    idnum: '32316',
    code: 'd4bf6b903d16e8c9d55d705425a04902',
    user: 'teddy.kalp',
    declare: '',
  }
  to_send.declare = document.getElementById('author').value;

  console.log(JSON.stringify(to_send));
  var response;
  if ('POST' == 'POST') {
    response = http_post('/submit.pl', 'data=' +
        base64(JSON.stringify(to_send)));
  } else {
    response = http_get("/submit.pl?" + fresh() + "&data=" +
           base64(JSON.stringify(to_send)));
  }
  try {
    let x = JSON.parse(response)
    if (x == true) {
      document.getElementById('possible_error').innerHTML = 'Successfully submitted.'
    } else {
      document.getElementById('possible_error').innerHTML = 'Warning: this received zero points. You may want to resubmit.'
		}
  } catch (error) {
    console.log(error + " " + response);
    document.getElementById('possible_error').innerHTML = response;
    return;
  }
}

</script>
<script src="webask.js"></script>

<body onload="init()">
<h1>Assignment four</h1><br>

You may use notes and lecture material as references.
You may <b>not</b> collaborate or discuss these questions with others.
<br/>

<a href="index.html">go back</a>



<form name="task3" id='answers'>
  <button type="submit" disabled style="display: none" aria-hidden="true"></button>
  <br><hr><h3>Question 1<div id="question_0_grade"></div>
</h3><br>
<div id="question_0" format="tf" name="autogen-a4-371"><img data-latex=true style="vertical-align:middle" src="/img/2305d8563bc91017e6d53495e91ec9a23ee7c899821d548ffd7ec1da2ecddfad.png" alt="I just flipped a coin, and it shows heads. Am I lying?"><br>
<input type="radio" id="question_0_true" name="g_question_0"       value="true"><label for="true">True</label><input type="radio" id="question_0_false" name="g_question_0"      value="false"><label for="false">False</label></div>
<br><hr><h3>Question 2<div id="question_1_grade"></div>
</h3><br>
<div id="question_1" format="mc" name="autogen-a4-372" choices=5>
<img data-latex=true style="vertical-align:middle" src="/img/03dfcd454c3066e0431a47c37a178028ff36603d25b11e89aa00574c07a8cbfa.png" alt="What then agentlike brought about that tragoady thundersday this municipal sin business?"><br><br>
<span>
<input type="radio" id="question_1_0" name="g_question_1" value="a"/>
<label for="a">a: <img data-latex=true style="vertical-align:middle" src="/img/ef65385d14e92b5fd7415dc85c910d608b86974859d7f990b1ccfcc1edf22bc2.png" alt="streetfleets"></label></span><br><br>
<span>
<input type="radio" id="question_1_1" name="g_question_1" value="b"/>
<label for="b">b: <img data-latex=true style="vertical-align:middle" src="/img/13ea45f79d1fd9b0a7793db664c1e1cbf225e8cea1592bcceac89096d96a6964.png" alt="tournintaxes"></label></span><br><br>
<span>
<input type="radio" id="question_1_2" name="g_question_1" value="c"/>
<label for="c">c: <img data-latex=true style="vertical-align:middle" src="/img/dc0ceb43a45edd3d8ecb0425914f4691b8481002c4f47b37f471e188aed59511.png" alt="autokinotons"></label></span><br><br>
<span>
<input type="radio" id="question_1_3" name="g_question_1" value="d"/>
<label for="d">d: <img data-latex=true style="vertical-align:middle" src="/img/018035d6311e793f7b40206819313cd5538c1c695e8b245a11460914d4b4a764.png" alt="fargobawlers"></label></span><br><br>
<span>
<input type="radio" id="question_1_4" name="g_question_1" value="e"/>
<label for="e">e: <img data-latex=true style="vertical-align:middle" src="/img/a4b94cdcd5a979afdac366738569d63dbec40905f7e8bad1ccd1abbf8c1ddd6b.png" alt="tramtrees"></label></span><br><br>
</div>
<br><hr><h3>Question 3<div id="question_2_grade"></div>
</h3><br>
<div id="question_2" format="line" name="autogen-a4-373"><img data-latex=true style="vertical-align:middle" src="/img/7ffe667bb4b2090d4ef92f5d3700bab2c69da56af6161907af5257ff46ef1243.png" alt="What is my favourite colour?"><br>
<div style="color:red" id="valid_2"></div>
<input onchange="valid(2)" data-validate="validate_none"  type="text" id="question_2_answer" value=""></div>
<br><hr><h3>Question 4<div id="question_3_grade"></div>
</h3><br>
<div id="question_3" format="line" name="autogen-a4-374"><img data-latex=true style="vertical-align:middle" src="/img/648cec83a0387dcf334aa78cdfdda30b2b12685dcd70f29104e1416d9f59a284.png" alt="I just rolled two dice. What did I roll?"><br>
<div style="color:red" id="valid_3"></div>
<input onchange="valid(3)" data-validate="validate_none"  type="text" id="question_3_answer" value=""></div>
<br><hr><h3>Question 5<div id="question_4_grade"></div>
</h3><br>
<div id="question_4" format="line" name="autogen-a4-375"><img data-latex=true style="vertical-align:middle" src="/img/4cfb32cdc152749e7fdba3d5681ea3201fe5918fcdf8a14a7ec11f161b575e5b.png" alt="How many minutes past the hour is a great time to start to sit under the shade of a tree?"><br>
<div style="color:red" id="valid_4"></div>
<input onchange="valid(4)" data-validate="validate_none"  type="text" id="question_4_answer" value=""></div>
<br><hr><h3>Question 6<div id="question_5_grade"></div>
</h3><br>
<div id="question_5" format="line" name="autogen-a4-376"><img data-latex=true style="vertical-align:middle" src="/img/6a42e50e81f07b490d32199f53f5e3257cc188c7a2fdae414ab5d51127e8efca.png" alt="This is a number from 1 to 1000. If you do this by hand you are doing it wrong."><br>
<div style="color:red" id="valid_5"></div>
<input onchange="valid(5)" data-validate="validate_none"  type="text" id="question_5_answer" value=""></div>
<br><hr><h3>Question 7<div id="question_6_grade"></div>
</h3><br>
<div id="question_6" format="mc" name="autogen-a4-377" choices=6>
<img data-latex=true style="vertical-align:middle" src="/img/60109a6a3bdbc496af8c099d98a0d9bde551ff9e8ed3687c9b7c1cb48c3cbe05.png" alt="This statement is false"><br><br>
<span>
<input type="radio" id="question_6_0" name="g_question_6" value="a"/>
<label for="a">a: <img data-latex=true style="vertical-align:middle" src="/img/b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b.png" alt="true"></label></span><br><br>
<span>
<input type="radio" id="question_6_1" name="g_question_6" value="b"/>
<label for="b">b: <img data-latex=true style="vertical-align:middle" src="/img/fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa.png" alt="false"></label></span><br><br>
<span>
<input type="radio" id="question_6_2" name="g_question_6" value="c"/>
<label for="c">c: <img data-latex=true style="vertical-align:middle" src="/img/53bb5c8badb8c1b8a5ed3c20d97b6b3ad3f7c8d517603a25a65dfb9acfb9e030.png" alt="true?"></label></span><br><br>
<span>
<input type="radio" id="question_6_3" name="g_question_6" value="d"/>
<label for="d">d: <img data-latex=true style="vertical-align:middle" src="/img/5813d2dbd4e72b7ae92b79c2a07115e247355569f7e9cc482a0882cabce86be4.png" alt="false?"></label></span><br><br>
<span>
<input type="radio" id="question_6_4" name="g_question_6" value="e"/>
<label for="e">e: <img data-latex=true style="vertical-align:middle" src="/img/7285214458c8ba3576ef3bc7cd40cd9e8d8deeb0fefb763997c679cf8f6c3135.png" alt="some of the above"></label></span><br><br>
<span>
<input type="radio" id="question_6_5" name="g_question_6" value="f"/>
<label for="f">f: <img data-latex=true style="vertical-align:middle" src="/img/10a465169d5f2324b5ff1a3483c26a9aa4963f00988dcb7c2dfb9fd9c9d29a36.png" alt="neither all nor none of the above"></label></span><br><br>
</div>

</form>
<br>
<div style="color:green; display: block" id='possible_error'>
</div><br>
<div style="display: none" id='declare'>
By signing this, I declare that I have not collaborated with any other person or
discussed these questions. I understand that the University's Academic Integrity
requirements apply to this task.<br>
<input type="text" id='author' placeholder='type your full name'>
<button onclick="submit()">submit</button>
</div>
</body>
</html>
