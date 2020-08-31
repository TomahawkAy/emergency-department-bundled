let promise = new Promise((r, v) => {
    setTimeout(() => {
        console.log('on progress');
        r('resolved')
    }, 1000);
});

let blocking = async () => {
    await promise.then((d) => console.log(d));
    console.log('resolved successfully');
    return 'finished';
};
blocking().then((e) => console.log(e));
