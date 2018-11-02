const {QQ} = require('qq-bot-rebown');
const seg = require("nodejieba");

const qq = new QQ();

let quote;
let lastSentence;

qq.on('msg', ({groupId, content}) => {
    if (!lastSentence) {
        if (content !== '') {
            lastSentence = content;
        }
    } else {
        if (lastSentence === content && quote !== content) {
            quote = content;
            setTimeout(() => {
                qq.sendGroupMsg(groupId, quote);
            }, 500)
        } else {
            if (lastSentence.substr(1) === content && content.length > 1) {
                qq.sendGroupMsg(groupId, content.substr(1));
            } else {
                if (content.length > 12) {
                    let res = seg.extract(content, 3);
                    if (res[0] && Math.random() < 0.1) {
                        console.log(res[0].word);
                        setTimeout(() => {
                            qq.sendGroupMsg(groupId, `${res[0].word}${Math.random() < 0.5 ? "!" : "?"}`);
                        }, 500)
                    }
                }
            }
        }

        lastSentence = content;
    }
});

qq.on('buddy', (msg) => {
    setTimeout(() => {
        qq.sendBuddyMsg(msg.id, `？`);
    }, 500)
});

qq.run();
