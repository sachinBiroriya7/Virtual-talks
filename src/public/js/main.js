$(function(){

    const socket = io()

    //getting dom elements since interface
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')

    //getting dom elements since interface
    const $contentWrap = $('#contentWrap') 
    const $nickWrap = $('#nickWrap')
    const $nickForm = $('#nickForm')
    const $nickError = $('#nickError')
    const $nickName = $('#nickName')

    const $userNames = $('#userNames')


    //events
    $messageForm.submit((e)=>{        
        e.preventDefault()
        let message = $messageBox.val()
        
        socket.emit('send message', message, (data)=>{
            $chat.append(`<p class="error">${data.message}</p>`)
        })

        $messageBox.val('')
    })

    $nickForm.submit((e)=>{
        e.preventDefault()
        let nickName = $nickName.val()

        socket.emit('new user', nickName,(res)=>{
            if(res){
                $nickWrap.hide()
                $contentWrap.show()
                $('#dUserNick').html(nickName)
            }else{
                $nickError.html(`
                <div class="alert alert-danger">Enter Nick Name.</div>
                `)
            }
        })
        $nickName.val('')
    })

    socket.on('new message',(data)=>{
        $chat.append(`<b>${data.nickname}</b>: ${data.message}<br/>`)
    })

    socket.on('user names',(userslist)=>{
        let list = ''
        for(user of userslist)
        list += `<p><i class="fas fa-user"></i> ${user}</p>`
        $userNames.html(list)
    })

    socket.on('whisper',(data)=>{
        $chat.append(`<b>${data.nickname}</b>: ${data.message}<br/>`)
    })

    socket.on('load old messages', (storageMessages)=>{
        for(message of storageMessages)
        $chat.append(`<b>${message.nickname}</b>: ${message.message} <br/> <small><em>${message.dateSend}</em></small><br/><br/>`)
    })

})