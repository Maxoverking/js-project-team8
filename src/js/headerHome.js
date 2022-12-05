function snowFall() {
    let count = 80;
    let container = document.querySelector('.header');
    let i = 0;

    while (i < count) {
        let snowflake = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let size = Math.random() * 10;
        snowflake.style.left = x + 'px';
        snowflake.style.top = y + 'px';
        snowflake.style.width = 1 + size + 'px';
        snowflake.style.height = 1 + size + 'px';
        let duration = Math.random() * 2;
        snowflake.style.animationDuration = 3 + duration + 's';

        container.appendChild(snowflake);
        i += 1;
    }
}
snowFall();