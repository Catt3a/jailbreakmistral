const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs')
const crypto = require('crypto')
const apiKey = process.env.API_KEY || '67'

app.use(express.json())
app.set('trust proxy', true)

let sessions = []
let chats = []
//сессия: токен, время последнего запроса, дата уничтожения, ip
//чат: токен, сессия [{role: 'user', content: 'xuz'}]

//страницы
const mainPage = fs.readFileSync('./main.html','utf8')

//отправка страниц
app.get('/', async (req,res,next) => {
  try {
    res.send(mainPage)
  } catch(error) {
    next(error)
  }
})

app.post('/v1/requestOnce', async (req,res,next) => {
  try {
  let text = ''
  let tokenChat = ''
  let tokenSession = ''
  if (req && req.body && req.body.aiRequest && typeof(req.body.aiRequest) == 'string' && req.body.aiRequest.length > 0) {text = req.body.aiRequest} else {res.status(200).json({success: false, message: 'я твою матушку в кино водил и сладкой ватой угощал'})}
  if (req && req.body && req.body.session && typeof(req.body.session) == 'string' && req.body.session.length > 0) {text = req.body.session} else {res.status(200).json({success: false, message: 'я твою матушку в кино водил и сладкой ватой угощал'})}
  if (req && req.body && req.body.chatId && typeof(req.body.chatId) == 'string' && req.body.chatId.length > 0) {text = req.body.chatId} else {res.status(200).json({success: false, message: 'я твою матушку в кино водил и сладкой ватой угощал'})}
  if (text != '' && tokenChat != '' && tokenSession != '') {
    let sessionExists = false
    let chatExists = false
    let createSessionBan = false
    for (const for_session of sessions) {
      if (for_session[0] === tokenSession) {
        sessionExists = true
        break
      }
    }
    
    if (tokenChat != 'a') {
      for (const for_chat of chats) {
        if (for_chat[0] === tokenChat) {
          chatExists = true
          break
        }
      }
    }

    if (sessionExists === false) {
       
    }
    
    if (chatExists === false) {
      tokenChat = crypto.randomUUID()
      chats.push([tokenChat, tokenSession, Date.now() + (2 * 24 * 60 * 60 * 1000), []])
    }

    

  } else {res.status(200).json({success: false, message: 'я твою матушку в кино водил и сладкой ватой угощал'})}
  } catch(error) {
    next(error)
  }
})

app.listen(PORT)
