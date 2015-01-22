$(document).ready(function(){
	$("#notificationArea").hide();
	$('#sampleElem').hide();

	var socketio = io.connect("192.168.2.83:1555"); // connecting to node server using socket.io, and here we go live with the server broadcasts
	var companyName="";
	$("#btn_login").click(function(){
		companyName=$("#companyName").val();
		$("#loginArea").fadeOut(function(){$("#notificationArea").fadeIn();});


	socketio.on("notifictaion_"+companyName, function(data) { // setting a listener to recieve and act to all broadcasts with the company name (notification_<company_name>)
    type=data["type"];   // storing data that came from server
    Ufrom=data["Ufrom"];
    msg=data["msg"];
    console.log(type);

    val=$('#notification_'+type).find('.number').html();
    val=parseInt(val)+1;
    $('#notification_'+type).find('.number').html(val);

    elem=$('.elementInfo').clone();
    elem.find('.name').html(Ufrom);
    elem.find('.msg').html(msg);
    elem.removeClass("elementInfo");
    $('#notification_'+type).find('.sub').append(elem);
    elem="";
	});



	});


	$("#btn_send").click(function(){
		msg=$("#msg").val();
		Ufrom=$("#userName").val();
		type=$("#type").val();
		company=$("#ToCompany").val();

		socketio.emit("notification",{ Ufrom:Ufrom,msg:msg,type:type,company:company}); // sending data to the server with a handler 'notification' with some json data
		console.log("sending");
		$("#msg").val("");
		$("#userName").val("");
		$("#ToCompany").val("");
	});
	



});