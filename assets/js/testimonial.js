
$(window).on("load", function() {
	var fn = {
    /*
		Launch
	*/

	Launch: function () {
        fn.IntroCanvas();
	},

    /*
        Intro Canvas
    */

    IntroCanvas: function() {

        const canvas = document.getElementById('intro__canvas');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            let width = canvas.width = canvas.offsetWidth;
            let height = canvas.height = canvas.offsetHeight;

            const colours = JSON.parse( canvas.getAttribute('data-colors') );

            const maxParticles = 200;
            let particles = [];

            // init client x and y values
            let cx = width / 2;
            let cy = height / 2;

            /*window.addEventListener('mousemove', (e) => {
                var bounds = canvas.getBoundingClientRect();

                cx = e.clientX - bounds.left;
                cy = e.clientY - bounds.top;
            });*/


            class Particle {
                constructor(x, y, vx, vy, radius, colour) {
                    this.x = x;
                    this.y = y;
                    this.vx = vx;
                    this.vy = vy;
                    this.radius = radius;
                    this.colour = colour;
                }
                move() {
                    // Reset particle if it goes off screen
                    if (this.y > height || this.y < 0 || this.x > width || this.x < 0) {
                        this.reset();
                    }
                    // Move particles with respect to velocity vectors
                    this.x += this.vx;
                    this.y += this.vy;
                }
                reset() {
                    this.x = cx;
                    this.y = cy;
                    this.vx = 2 + Math.random() * - 4;
                    this.vy = 2 + Math.random() * - 4;
                    this.radius = 1 + Math.random() * 3;
                }
                draw(ctx) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = this.colour;
                    ctx.fill();
                }
            }

            function initParticles() {
                for (let i = 0; i < maxParticles; i++) {
                    setTimeout(createParticle, 10 * i, i);
                }
            }

            function createParticle(i) {
                let p = new Particle(
                    Math.floor(Math.random() * width), // x
                    Math.floor(Math.random() * height), // y
                    1.5 + Math.random() * - 3, // vx
                    1.5 + Math.random() * - 3, // vy
                    1 + Math.random(), // radius
                    colours[Math.floor(Math.random() * colours.length)]
                );
                particles.push(p);
            }


            function loop() {
                ctx.clearRect(0, 0, width, height);
                for (let particle of particles) {
                    particle.move();
                    particle.draw(ctx);
                }
                requestAnimationFrame(loop);
            }

            // Start animation
            initParticles();
            loop();


            // Resize canvas - responsive
            window.addEventListener('resize', resize);
            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
        }
    },
};

fn.Launch();
    setTimeout(function() {

        function n() {
            S.animate({
                d: "M1010.1,64C1137.4,64,1350,0,1350,0H0C0,0,839.3,64,1010.1,64z"
            }, 8e3, mina.easeinout, o)
        }

        function o() {
            S.animate({
                d: "M287,64C414.3,64,1350,0,1350,0H0C0,0,116.2,64,287,64z"
            }, 8e3, mina.easeinout, n)
        }

        function a() {
            y.animate({
                d: "M1076.6,118.4C1247.4,118.4,1350,0.2,1350,0.2H0C0,0.2,908.6,118.4,1076.6,118.4z"
            }, 12e3, mina.easeinout, i)
        }

        function i() {
            y.animate({
                d: "M307.1,118.4C477.8,118.4,1350,0.2,1350,0.2H0C0,0.2,139.5,118.4,307.1,118.4z"
            }, 12e3, mina.easeinout, a)
        }

        function c() {
            M.animate({
                d: "M317.9,76C467,76,1350,0.2,1350,0.2H0C0,0.2,1,76,317.9,76z"
            }, 9e3, mina.easeinout, d)
        }

        function d() {
            M.animate({
                d: "M954,76c149,0,396-75.8,396-75.8H0C0,0.2,637,76,954,76z"
            }, 9e3, mina.easeinout, c)
        }

        function l() {
            z.animate({
                d: "M474,67c168,0,876-66.8,876-66.8H0C0,0.2,168.1,67,474,67z"
            }, 11e3, mina.easeinout, r)
        }

        function r() {
            z.animate({
                d: "M904,67c168,0,446-66.8,446-66.8H0C0,0.2,598.2,67,904,67z"
            }, 11e3, mina.easeinout, l)
        }

        function u() {
            H.animate({
                d: "M327,38C478.3,38,1350,0.1,1350,0.1H0C0,0.1,0,38,327,38z"
            }, 14e3, mina.easeinout, m)
        }

        function m() {
            H.animate({
                d: "M857,38c151.3,0,493-37.9,493-37.9H0C0,0.1,530,38,857,38z"
            }, 14e3, mina.easeinout, u)
        }

        function C() {
            L.animate({
                d: "M1175,103c169,0,175-102.9,175-102.9H0C0,0.1,1007,103,1175,103z"
            }, 8e3, mina.easeinout, p)
        }

        function p() {
            L.animate({
                d: "M688,103c169,0,662-102.9,662-102.9H0C0,0.1,520,103,688,103z"
            }, 8e3, mina.easeinout, C)
        }
        $window = $(window);
        var f = $window.height() / 2,
            h = $("#container-general"),
            g = $("#section-quote").offset().top - f
        $(document).on('click','#section-quote .container-pe-quote .pp-quote',function() {
            var e = $(this).data("textquote");
            $("#section-quote .container-pe-quote .pp-quote").removeClass("active"),
                $(this).addClass("active"), $("#section-quote .container-quote").removeClass("carousel-on"),
                $("#section-quote .container-quote .quote.show").removeClass("show").addClass("hide-bottom"),
                $("." + e).removeClass("hide-bottom hide-top").addClass("show")
        })
    }, 150);


        setInterval(function () {
            var maxVal= $("#section-quote .container-pe-quote .pp-quote").length;
            var randomVal = Math.floor((Math.random() * maxVal)+1);
            var count = 1;


            $('.pp-quote').each( function(){
                var obj = $(this);
                if(count==randomVal){
                    var dataRR = obj.attr('data-textquote');
                    $(".pp-quote[data-textquote="+dataRR+"]").click();
                }
                count++;
            });
        },4000);

});

