$(document).ready(function(){
  $('.mass_delete').click(function(){
    var arr=new Array();
    if($('input:checkbox:checked').length>0){
      $('input:checkbox:checked').each(function(){
        arr.push($(this).attr('id'));
      });
      sendResponse(arr);
      //console.log(arr);
    }
  });

  function sendResponse(arr) {
    $.ajax({
      type:'post',
      url:"http://127.0.0.1:3000/mass_delete",
      data:{val:arr},
      //data:arr,
      success:function(response){
        //alert(response);
      }
    });
  }

});

// $(document).ready(function () {
//   $(".mass_delete").click(function(e) {
//     e.preventDefault();
//     var array = [];
//     var checkboxes = document.getElementsByClassName("checkbox");
//     for (var i = checkboxes.length -1 ; i>= 0; i--) {
//         if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
//             array.push(checkboxes[i].value);
//         }
//     }
//     var data = {values:array}
//     $.ajax({
//       type:'POST',
//       contentType: 'application/json; charset=utf-8',
//       data:data,
//       url:"http://127.0.0.1:3000/mass_delete",
//       success: function(data) {
//           console.log(data);
//       }
//     });
//   });
// });
