/* LetsChat - A social media platform framework
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

noseX = 0;
noseY = 0;

function preload()
{
    //clown_nose = loadImage('https://i.postimg.cc/mkcYvjtJ/png-clipart-clown-drawing-laughter-clown-food-orange-thumbnail.png');
    //clown_nose = loadImage('https://i.postimg.cc/mkJgnNHd/455-4557163-icon-clown-nose-circle-hd-png-download.png');
    clown_nose = loadImage('https://i.postimg.cc/j20sQd09/clownnose.png');

}

function setup()
{
    canvas = createCanvas(400, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 400, 300);
    //fill(255, 0, 0); 
    //stroke(255, 0, 0);
    //circle(noseX, noseY, 20);
    image(clown_nose, noseX-15, noseY-15, 30, 30); //The 30 in the end can be decreased if you think the nose size is too big, if the nose does not align properly then you can replace noseX-15 with noseX-10 and noseY-15 with noseY-10 which it originally was. If it still does not align correctly then you can still try playing with the numbers to get your desired result. 
}

function take_snapshot()
{
    save('my_filter_image.png')
}

function modelLoaded()
{
    console.log('poseNet is initialized.');
}

function gotPoses(results)
{
    if (results.length>0){
        console.log(results);
        //console.log("Nose X = "+results[0].pose.nose.x);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = "+noseX);
        console.log("NoseY = "+noseY);
        //console.log("Nose Y = "+results[0].pose.nose.y);
    }
}
