const {QQ} = require('qq-bot-rebown');
const seg = require("nodejieba");

const qq = new QQ();

let quote;
let lastSentense;

qq.on('msg', ({groupId, content}) => {
    if (!lastSentense) {
        if (content !== '') {
            lastSentense = content;
        }
    } else {
        if (lastSentense === content && quote !== content) {
            quote = content;
            setTimeout(500, () => {
                qq.sendGroupMsg(groupId, quote);
            })
        } else {
            if (lastSentense.substr(1) === content && content.length > 1) {
                qq.sendGroupMsg(groupId, content.substr(1));
            } else {
                if (content.length > 12) {
                    let res = seg.extract(content, 3);
                    if (res[0] && Math.random() < 0.1) {
                        console.log(res[0].word);
                        setTimeout(500, () => {
                            qq.sendGroupMsg(groupId, `${res[0].word}${Math.random() < 0.5 ? "!" : "?"}`);
                        })
                    }
                }
            }
        }

        lastSentense = content;
    }
});

qq.on('buddy', (msg) => {
    qq.sendBuddyMsg(msg.id, `Hi Buddy`);
});

qq.run();
