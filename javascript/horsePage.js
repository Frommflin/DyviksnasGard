function fillPage(name){
    // TODO: Create and connect to database for filling page dynamically
    let horse = document.getElementById("horseInfo");
    let str = "";

    str += `<h1>${name}</h1>`;
    str += `<h5>Smeknamn</h5>`;
    str += `<div>`;
    str += `<span>Född:</span> [år] (ålder)`;
    str += `</div>`;
    str += `<div>`;
    str += `<span>Färg:</span> [färg], [eventuella tecken]`;
    str += `</div>`;
    str += `<div>`;
    str += `<span>Ras:</span> [ras]`;
    str += `</div>`;
    str += `<div>`;
    str += `<span>Mankhöjd:</span> [XXX cm]`;
    str += `</div>`;
    str += `<div>`;
    str += `<span>Född:</span> [år] (ålder)`;
    str += `</div>`;
    str += `<div>`;
    str += `<p>Beskrivning/introduktion om hästen</p>`;
    str += `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vestibulum sed arcu non odio. At consectetur lorem donec massa sapien faucibus et molestie. Mollis nunc sed id semper. Ridiculus mus mauris vitae ultricies leo integer. Tortor aliquam nulla facilisi cras. Ut lectus arcu bibendum at varius vel pharetra. Sed vulputate mi sit amet mauris commodo. In nibh mauris cursus mattis. Eget gravida cum sociis natoque penatibus et. Dui nunc mattis enim ut. Amet nulla facilisi morbi tempus iaculis. Senectus et netus et malesuada fames ac. Velit ut tortor pretium viverra suspendisse. Fermentum leo vel orci porta non pulvinar neque laoreet suspendisse. Tellus at urna condimentum mattis pellentesque id nibh tortor. Habitant morbi tristique senectus et netus et malesuada fames ac.</p>`;
    str += `<p>Lacus sed viverra tellus in hac habitasse platea dictumst. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Ut pharetra sit amet aliquam id. Lobortis elementum nibh tellus molestie nunc non. In tellus integer feugiat scelerisque varius morbi. Nec tincidunt praesent semper feugiat nibh sed. Porttitor massa id neque aliquam vestibulum morbi. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Maecenas accumsan lacus vel facilisis. Imperdiet massa tincidunt nunc pulvinar sapien.</p>`;
    str += `<p>Lacus sed viverra tellus in hac habitasse platea dictumst. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Ut pharetra sit amet aliquam id. Lobortis elementum nibh tellus molestie nunc non. In tellus integer feugiat scelerisque varius morbi. Nec tincidunt praesent semper feugiat nibh sed. Porttitor massa id neque aliquam vestibulum morbi. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Maecenas accumsan lacus vel facilisis. Imperdiet massa tincidunt nunc pulvinar sapien.</p>`;
    str += `</div>`;
    horse.innerHTML = str;
}