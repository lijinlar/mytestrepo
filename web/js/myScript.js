$(document).ready(function(){
	window.location.hash='';
	var socketio = io.connect("mb-test.in:1555"); // connecting to node server using socket.io, and here we go live with the server broadcasts
	var myId=socketio.id;
	var roomId='';
	socketio.on("chatroom",function(data){
		$('#chatroomlist').html('');
		data.rooms.forEach(function(item){
			var elem=$('<div class="btn btn-warning">');
			    elem.html(item.name);
			    elem.attr('id',item.id);
			    elem.click(function(){
			    	roomId=$(this).attr('id');
			    	$('#chatwindow').html('');
			    	$('#roomname').html($(this).html());
			    	socketio.on('chat'+item.id,function(chatData){
			    		notifyMe(chatData);
			    		var chatThread='<span class="chat-name">'+chatData.from+'</span>:<span class="text-muted">'+chatData.msg+'</span><br>';
			    		$('#chatwindow').append(chatThread);
			    	});
			    	window.location.hash='chatRoom';
			    });
			    $('#chatroomlist').append(elem);
		});
	});
	socketio.on("msg"+myId,function(msgData){
		if(msgData.type="roomCreate"){
			roomId=data.id;
		}
	});


// join chat app
	$("#btn-join").click(function(e){
		e.preventDefault();

		if($(this).hasClass('btn-success')){
			socketio.emit("join",{name:$('#userName').val()});
			window.location.hash='chatRooms';
		}
		
	});

	$('#userName').keyup(function(e){
		if($(this).val().length>3){
			$('#btn-join').removeClass('btn-default');
			$('#btn-join').addClass('btn-success');
		}
		else{
			$('#btn-join').removeClass('btn-success');
			$('#btn-join').addClass('btn-default');	
		}
	});
//end join

//create chat room
$("#createRoom").click(function(e){
		e.preventDefault();

		if($(this).hasClass('btn-success')){
			socketio.emit("createRoom",{name:$('#newRoomname').val()});
		}
		
	});

	$('#newRoomname').keyup(function(e){
		if($(this).val().length>3){
			$('#createRoom').removeClass('btn-default');
			$('#createRoom').addClass('btn-success');
		}
		else{
			$('#createRoom').removeClass('btn-success');
			$('#createRoom').addClass('btn-default');	
		}
	});
//end chat room creation

//send chats
$("#sendmsg").click(function(e){
		e.preventDefault();

		if($(this).hasClass('btn-success')){
			socketio.emit("chat",{msg:$('#newmsg').val(),roomId:roomId});
			$('#newmsg').val('');
		}
		
	});

	$('#newmsg').keyup(function(e){
		if($(this).val().length>1){
			$('#sendmsg').removeClass('btn-default');
			$('#sendmsg').addClass('btn-success');
		}
		else{
			$('#sendmsg').removeClass('btn-success');
			$('#sendmsg').addClass('btn-default');	
		}
	});

	//end send chats

	$.localScroll.defaults.axis = 'x';

			$.localScroll({
				target: '#main-scoll', // could be a selector or a jQuery object too.
				queue:true,
				duration:1000,
				hash:true,
				onBefore:function( e, anchor, $target ){
					// The 'this' is the settings object, can be modified
				},
				onAfter:function( anchor, settings ){
					// The 'this' contains the scrolled element (#content)
				}
			});





function notifyMe(chatData) {
  if (!Notification) {
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();

  var notification = new Notification('Message from '+chatData.from, {
    icon: '../img/icon.jpg',
    body: chatData.msg,
  });

  notification.onclick = function () {
    window.focus();
  }
}


});