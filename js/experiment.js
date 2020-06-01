

// helper functions
function load_page(page, callback) {
  $('#container-exp').load(page, function(responseTxt, statusTxt, xhr){
   if(statusTxt == "success")
     callback();
   if(statusTxt == "error")
     alert("Error: " + xhr.status + ": " + xhr.statusText);
 });
}

function set_next_onclick(clickfunction) {
  document.getElementById('next').onclick = clickfunction;
};

function make_score_string() {
  $('#score').html('<div id="score">' + String(Math.round(block_total_score)) + ' / 100</div>');
}

/************************
* Experiment *
*************************/

// these functions are executed linearlly
function load_welcome() {
  // this call back function is called once the html is loaded...
  var callback = function() { set_next_onclick(load_consent) };

  // load the html, run the callback function
  load_page('./static/templates/instructions/welcome.html', callback);
}

function load_consent() {
  // this call back function is called once the html is loaded...
  var callback = function() { set_next_onclick(load_mturk_id) };

  // load the html, run the callback function
  load_page('./static/templates/instructions/consent.html', callback);
}

function load_mturk_id() {

  var onclick = function() {
    mTurkID = document.getElementById("mTurkID").value;
    load_instructions_1();
  }

  // this call back function is called once the html is loaded...
  var callback = function() {set_next_onclick(onclick)};

  // load the html, run the callback function
  load_page('./static/templates/questionnaires/questionnaire-mturk_id.html', callback);
}

// these functions are executed linearlly
function load_instructions_1() {
  // this call back function is called once the html is loaded...
  var callback = function() { set_next_onclick(load_instructions_2) };

  // load the html, run the callback function
  load_page('./static/templates/instructions/instructions_1.html', callback);
}

function load_instructions_2() {
  var callback = function() { set_next_onclick(start_block_one) };
  load_page('./static/templates/instructions/instructions_2.html', callback);
}

function start_block_one() {
  // run block one, and specify the break page to be shown after
  var callback = function() {
    block_total_score = 0; // reset the score to zero
    run_block(all_blocks[0], break_one);
  };
  load_page('./static/templates/canvas_stage.html', callback);
}

function break_one() {
  var callback = function() { 
    make_score_string();
    set_next_onclick(break_one_b);
  };
  load_page('./static/templates/instructions/break_one.html', callback);
}

function break_one_b() {
  var callback = function() { set_next_onclick(start_block_two) };
  load_page('./static/templates/instructions/break_one_b.html', callback);
}

function start_block_two() {
  // run block two, and specify the break page to be shown after
  var callback = function() {
    block_total_score = 0; // reset the score to zero
    run_block(all_blocks[1], break_two)
  };
  load_page('./static/templates/canvas_stage.html', callback);
}

function break_two() {
  var callback = function() { 
    make_score_string();
    set_next_onclick(break_two_b) 
  };
  load_page('./static/templates/instructions/break_two.html', callback);
}

function break_two_b() {
  var callback = function() { 
    set_next_onclick(start_block_three) 
  };
  load_page('./static/templates/instructions/break_two_b.html', callback);
}

function start_block_three() {
  // run block two, and specify the break page to be shown after
  var callback = function() {
    block_total_score = 0; // reset the score to zero
    run_block(all_blocks[2], break_three)
  };
  load_page('./static/templates/canvas_stage.html', callback);
}

function break_three() {
  var callback = function() { 
    make_score_string();
    set_next_onclick(break_three_b) 
  };
  load_page('./static/templates/instructions/break_two.html', callback);
}

function break_three_b() {
  var callback = function() { 
    set_next_onclick(start_block_four) 
  };
  load_page('./static/templates/instructions/break_two_b.html', callback);
}

function start_block_four() {
  var callback = function() {
    block_total_score = 0; // reset the score to zero
    run_block(all_blocks[3], end)
  };
  load_page('./static/templates/canvas_stage.html', callback);
}

function end() {
  load_page('./static/templates/instructions/after_exp_interlude.html', function(){
    make_score_string();
    load_questionaire_1();
  });
}

function load_questionaire_1() {
  // this call back function is called once the html is loaded...
  load_page('./static/templates/questionnaires/questionnaire-demographics.html', function(){
    set_next_onclick(load_questionaire_2)
  });
}

function load_questionaire_2() {
  // this call back function is called once the html is loaded...
  load_page('./static/templates/questionnaires/questionnaire-task.html', function(){
    set_next_onclick(finish)
  });
}

function finish(){
  $('#container-exp').html('./static/templates/questionnaires/end.html')
};