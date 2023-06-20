$(document).ready(function(){

//Less than method
  jQuery.validator.addMethod('lessThan', function(value, element, param){
    return this.optional(element) || $(param).val() == '' || parseInt(value) <= parseInt($(param).val());
  },'    Value is not less than the Maximum Value');
  //Greater than method
  jQuery.validator.addMethod('greaterThan', function(value, element, param){
    return this.optional(element) || $(param).val() == '' || parseInt(value) >= parseInt($(param).val());
  },'    Value is not greater than the Minimum  Value');

  //validate the user input
  $('#formID').submit(function(e){
    e.preventDefault();
  }).validate({
    rules: {
      minH:{
        //input required
        required: true,
        //must be a num value
        number: true,
        //between -50 and 50
        range: [-50,50],
        //less than maxHorizontal value
        lessThan: "#maxHorizontal"
      },
      maxH:{
        required: true,
        number: true,
        range: [-50,50],
        //greater than minHorizontal value
        greaterThan: "#minHorizontal"
      },
      minV:{
        required: true,
        number: true,
        range: [-50,50],
        lessThan: "#maxVertical"
      },
      maxV:{
        required: true,
        number: true,
        range: [-50,50],
        greaterThan: "#minVertical"
      }
    },
    messages:{
      // here just setting up the messages to  be custom made for each input for maximum clarity and feedback
      minH:{
        required: '  ERROR: Please enter a value ',
        number: '    ERROR: Can only be a number value ',
        range: '    ERROR: Value must be between -50 and 50 ',
        lessThan:'    ERROR: Value must be less than the Maximum Horizontal value '

      },
      maxH:{
        required:'   ERROR: Please enter a value ',
        number: '    ERROR: Can only be a number value ',
        range: '    ERROR: Value must be between -50 and 50 ',
        greaterThan:'    ERROR: Value must be greater than the Minimum Horizontal value '
      },
      minV:{
        required:'   ERROR: Please enter a value ',
        number: '    ERROR: Can only be a number value ',
        range: '    ERROR: Value must be between -50 and 50 ',
        lessThan:'    ERROR: Value must be less than the Maximum Vertical value '
      },
      maxV:{
        required:'   ERROR: Please enter a value ',
        number: '    ERROR: Can only be a number value ',
        range: '    ERROR: Value must be between -50 and 50 ',
        greaterThan:'    ERROR: Value must be greater than the Minimum Horizontal value '
      }
    },
    // this handles what happends when my "submit" input is presses
    submitHandler: function(form) {
      // here we chech if the form is valid and if so it calls my function to generate the multipication table
      if($('#formID').valid()){
        generate_multitable();
      }
      // else it returns false so it doesnt call the func and waits for you to fix the values and resubmit
      else {
        return false;
      }
    }
  });

  $('#sliderMinH').slider({
    min:-50,
    max:50,
    slide: function(event,ui) {
      $('#minHorizontal').val(ui.value).change();
    }
  });

  $('#sliderMaxH').slider({
    min:-50,
    max:50,
    slide: function(event,ui) {
      $('#maxHorizontal').val(ui.value).change();
    }
  });

  $('#sliderMinV').slider({
    min:-50,
    max:50,
    slide: function(event,ui) {
      $('#minVertical').val(ui.value).change();
    }
  });

  $('#sliderMaxV').slider({
    min:-50,
    max:50,
    slide: function(event,ui) {
      $('#maxVertical').val(ui.value).change();
    }
  });

  //sliderMinH
  $("#minHorizontal").change(function(){
  var oldvalue1=$("#sliderMinH").slider("option", "value");
  var newvalue1=$(this).val();

  if (isNaN(newvalue1) || newvalue1 < -50 || newvalue1 > 50) {
        $("#sliderMinH").val(oldvalue1);
      } else {
        $("#sliderMinH").slider("option", "value", newvalue1);
      }
      // Corrects vallidation so that only submits and checks when there is an input value in bot min/max
      if ($('#maxHorizontal').val()!=''){
        $("#formID").validate().element("#minHorizontal");
        $("#formID").validate().element("#maxHorizontal");
      }
      if($("#maxVertical").val()!='' && $("#minColumn").val() !='' && $("#minHorizontal").val() !='' && $("maxH").val() !=''){
      $("#formID").submit();
    }
  });

  //sliderMaxR
  $("#maxHorizontal").change(function(){
  var oldvalue2=$("#sliderMaxR").slider("option", "value");
  var newvalue2=$(this).val();

  if (isNaN(newvalue2) || newvalue2 < -50 || newvalue2 > 50) {
        $("#sliderMaxR").val(oldvalue2);
      } else {
        $("#sliderMaxR").slider("option", "value", newvalue2);
      }
      // Corrects vallidation, so that only submits and checks when there is an input value in bot min/max
      if ($('#minHorizontal').val()!=''){
        $("#formID").validate().element("#maxHorizontal");
        $("#formID").validate().element("#minHorizontal");
      }
      if($("#maxVertical").val()!='' && $("#minColumn").val() !='' && $("#minHorizontal").val() !='' && $("maxH").val() !=''){
      $("#formID").submit();
    }
  });

  //sliderMinC
  $("#minColumn").change(function(){
  var oldvalue3=$("#sliderMinC").slider("option", "value");
  var newvalue3=$(this).val();

  if (isNaN(newvalue3) || newvalue3 < -50 || newvalue3 > 50) {
        $("#sliderMinC").val(oldvalue3);
      } else {
        $("#sliderMinC").slider("option", "value", newvalue3);
      }
      // Corrects vallidation, so that only submits and checks when there is an input value in bot min/max
      if ($('#maxVertical').val()!=''){
        $("#formID").validate().element("#maxVertical");
        $("#formID").validate().element("#minColumn");
      }
      if($("#maxVertical").val()!='' && $("#minColumn").val() !='' && $("#minHorizontal").val() !='' && $("maxH").val() !=''){
      $("#formID").submit();
    }
  });

  //sliderMaxC
  $("#maxVertical").change(function(){
  var oldvalue4=$("#sliderMaxC").slider("option", "value");
  var newvalue4=$(this).val();

  if (isNaN(newvalue4) || newvalue4 < -50 || newvalue4 > 50) {
        $("#sliderMaxC").val(oldvalue4);
      } else {
        $("#sliderMaxC").slider("option", "value", newvalue4);
      }
      if ($('#minColumn').val()!=''){
        $("#formID").validate().element("#minColumn");
        $("#formID").validate().element("#maxVertical");
      }
      if($("#maxVertical").val()!='' && $("#minColumn").val() !='' && $("#minHorizontal").val() !='' && $("maxH").val() !=''){
      $("#formID").submit();
    }
  });
});


  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function(form) {
    output.innerHTML = this.value;
  }

// Creating a function that will generate our multiplication table
function generate_multitable() {

  //Here delete container holding table if it exists
  if(document.querySelector(".tContainer")){
    var remove= document.querySelector(".tContainer")
    var parent1= remove.parentElement;
    parent1.removeChild(remove);
  }

  // Taking in the form values as a parseInt to eliminate problems with negative numbers
  var minH = parseInt(document.getElementById('minHorizontal').value);
  var maxH = parseInt(document.getElementById('maxHorizontal').value);
  var minV = parseInt(document.getElementById('minVertical').value);
  var maxV = parseInt(document.getElementById('maxVertical').value);

  // row column lengths + 2 to account for the
  // correct lenth + outer edge to show values
  //ie 5-3 =2, [3 4 5] = 3,so + 1 and +1  for the guiding values
  var hlength = ((maxH - minH)+2)
  var vlength = ((maxV - minV)+2)

 // Creating arrays that will hold the horizontal values
  var harr =[];
  for(x=minH; x <=maxH; x++){
    harr.push(x);
  }

// Creating arrays that will hold the vertical values
  var varr =[];
  for(x=minV; x <=maxV; x++){
      varr.push(x);
  }

/* REFERENCE:
https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
*/
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var wrapper = document.createElement("div");
  wrapper.classList.add("tContainer")

  // creating all cells
  for (var i = 0; i < hlength; i++) {
    // creates a table row
    var row = document.createElement("tr");
    row.setAttribute("id","mtRow")
    //
    for (var j = 0; j < vlength; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row

      //Here allows me to enter in the first cell that is blank
      if(i ==0 && j ==0){
        var cell = document.createElement("td");
        var cellText = document.createTextNode('');
        cell.setAttribute("id","mtCell");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      //here allows me to end the guiding values for the row
       else if (i==0 ) {

        var cell = document.createElement("td");
        var cellText = document.createTextNode(varr[j-1]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      //here allows me to end the guiding values for the row column
       else if (j==0 ) {

        var cell = document.createElement("td");
        var cellText = document.createTextNode(harr[i-1]);
        cell.setAttribute("id","mtCellC");
        cell.appendChild(cellText);
        row.appendChild(cell);

      }
      //here filling in the rest of the table
      else{
        var cell = document.createElement("td");
        var cellText = document.createTextNode(harr[i-1]*varr[j-1]);
        cell.setAttribute("id","mtCellG");
        cell.appendChild(cellText);
        row.appendChild(cell);
     }
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

  wrapper.appendChild(tbl)
  // appends <table> into <body>
  body.appendChild(wrapper);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
  tbl.setAttribute("id","multiTable");

}