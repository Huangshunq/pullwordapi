# pullwordapi

It uses ES6 promises.

details: [pullword homepage](http://pullword.com/)

## 下载 install

    npm install --save request request-promise-native pullwordapi

## 用法 usage

你可以使用 `get` 方法与 `post` 方法，它们都有三个参数，第一个参数source传入需要分词的语句，第二个参数threshold传入需要过滤的概率值，第三个参数debug传入是否返回各词概率值的布尔值。

    const pw = require('pullwordapi');

    pw.get('李彦宏是马云最大威胁嘛？', 0, true)
    .then(result => console.log(result))
    .catch(result => console.log(result.message));
    // => Map {
    //   '李彦' => '0.23007',
    //   '李彦宏' => '0.900302',
    //   '彦宏' => '0.0703263',
    //   '马云' => '1',
    //   '最大' => '0.892363',
    //   '大威' => '0.289136',
    //   '威胁' => '0.9367' }

    pw.get('李彦宏是马云最大威胁嘛？', 1)
    .then(result => console.log(result))
    .catch(result => console.log(result.message));
    // 默认 debug = true
    // => Map { '马云' => '1' }

    pw.get('李彦宏是马云最大威胁嘛？')
    .then(result => console.log(result))
    .catch(result => console.log(result.message));
    // 默认 threshold = 0, debug = true
    // => Map {
    //   '李彦' => '0.23007',
    //   '李彦宏' => '0.900302',
    //   '彦宏' => '0.0703263',
    //   '马云' => '1',
    //   '最大' => '0.892363',
    //   '大威' => '0.289136',
    //   '威胁' => '0.9367' }

    pw.get('李彦宏是马云最大威胁嘛？', 0, false)
    .then(result => console.log(result))
    .catch(result => console.log(result.message));
    // => [ '李彦', '李彦宏', '彦宏', '马云', '最大', '大威', '威胁' ]

你也可以使用 `checkParam` 方法检测传入的参数是否合法。

    const pw = require('pullwordapi');

    pw.checkParam('李彦宏是马云最大威胁嘛？', 0, true)
    .then(() => console.log('合法'))
    .catch(() => console.log('不合法'));
    // => '合法'