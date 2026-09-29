/* =========================================================
   A-CREATIVES.CO
   SAFE MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {

        // Safety fallback
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.pointerEvents = "none";
        }, 3200);

    }


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       REVEAL ANIMATION
       IMPORTANT:
       Old CSS has .reveal { opacity:0 }
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        // Immediately make elements visible
        // if IntersectionObserver is unavailable.
        if (!("IntersectionObserver" in window)) {

            revealElements.forEach(el => {
                el.classList.add("visible");
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });

        } else {

            const observer =
                new IntersectionObserver(
                    (entries, obs) => {

                        entries.forEach(entry => {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                obs.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.08
                    }
                );


            revealElements.forEach(el => {
                observer.observe(el);
            });

        }

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");


    if (
        cursor &&
        follower &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let followerX = mouseX;
        let followerY = mouseY;


        document.addEventListener("mousemove", e => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;

        });


        const animateCursor = () => {

            followerX +=
                (mouseX - followerX) * 0.12;

            followerY +=
                (mouseY - followerY) * 0.12;

            follower.style.left =
                `${followerX}px`;

            follower.style.top =
                `${followerY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };

        animateCursor();


        const hoverElements =
            document.querySelectorAll(
                "a, button, .work-card, .service-card"
            );


        hoverElements.forEach(el => {

            el.addEventListener("mouseenter", () => {

                follower.style.width = "50px";
                follower.style.height = "50px";

            });


            el.addEventListener("mouseleave", () => {

                follower.style.width = "35px";
                follower.style.height = "35px";

            });

        });

    }


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(".magnetic");


    magneticElements.forEach(el => {

        el.addEventListener("mousemove", e => {

            const rect =
                el.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            el.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });


        el.addEventListener("mouseleave", () => {

            el.style.transform =
                "translate(0, 0)";

        });

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const projectForm =
        document.querySelector(".project-form");

    const formMessage =
        document.querySelector(".form-message");


    if (projectForm) {

        projectForm.addEventListener("submit", e => {

            e.preventDefault();

            if (formMessage) {

                formMessage.textContent =
                    "Thank you! Your project enquiry has been received. We will contact you shortly.";

                formMessage.classList.add("active");

            }

            projectForm.reset();

        });

    }


    /* =====================================================
       3D BACKGROUND
       THREE.JS
    ===================================================== */

    const canvas =
        document.getElementById("webgl");


    if (
        canvas &&
        typeof THREE !== "undefined"
    ) {

        try {

            const scene =
                new THREE.Scene();


            const camera =
                new THREE.PerspectiveCamera(
                    60,
                    window.innerWidth /
                    window.innerHeight,
                    0.1,
                    1000
                );


            camera.position.z = 5;


            const renderer =
                new THREE.WebGLRenderer({
                    canvas: canvas,
                    alpha: true,
                    antialias: true
                });


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            /* ---------------------------------------------
               PARTICLES
            --------------------------------------------- */

            const particleCount = 900;

            const positions =
                new Float32Array(
                    particleCount * 3
                );


            for (
                let i = 0;
                i < particleCount * 3;
                i += 3
            ) {

                positions[i] =
                    (Math.random() - 0.5) * 14;

                positions[i + 1] =
                    (Math.random() - 0.5) * 9;

                positions[i + 2] =
                    (Math.random() - 0.5) * 10;

            }


            const geometry =
                new THREE.BufferGeometry();

            geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(
                    positions,
                    3
                )
            );


            const material =
                new THREE.PointsMaterial({

                    color: 0xb9ff00,

                    size: 0.018,

                    transparent: true,

                    opacity: 0.5

                });


            const particles =
                new THREE.Points(
                    geometry,
                    material
                );


            scene.add(particles);


            /* ---------------------------------------------
               3D FLOATING OBJECT
            --------------------------------------------- */

            const shapeGeometry =
                new THREE.IcosahedronGeometry(
                    1.25,
                    2
                );


            const shapeMaterial =
                new THREE.MeshBasicMaterial({

                    color: 0xb9ff00,

                    wireframe: true,

                    transparent: true,

                    opacity: 0.08

                });


            const shape =
                new THREE.Mesh(
                    shapeGeometry,
                    shapeMaterial
                );


            shape.position.x = 2.7;

            shape.position.y = 0.2;

            scene.add(shape);


            /* ---------------------------------------------
               MOUSE MOVEMENT
            --------------------------------------------- */

            let mouseX = 0;
            let mouseY = 0;


            window.addEventListener(
                "mousemove",
                e => {

                    mouseX =
                        (e.clientX /
                            window.innerWidth -
                            0.5);

                    mouseY =
                        (e.clientY /
                            window.innerHeight -
                            0.5);

                },
                { passive: true }
            );


            /* ---------------------------------------------
               ANIMATION
            --------------------------------------------- */

            const clock =
                new THREE.Clock();


            const animate = () => {

                requestAnimationFrame(
                    animate
                );


                const elapsed =
                    clock.getElapsedTime();


                particles.rotation.y =
                    elapsed * 0.015;


                particles.rotation.x =
                    elapsed * 0.005;


                shape.rotation.x =
                    elapsed * 0.15;

                shape.rotation.y =
                    elapsed * 0.2;


                shape.position.x =
                    2.7 +
                    mouseX * 0.35;

                shape.position.y =
                    0.2 -
                    mouseY * 0.25;


                renderer.render(
                    scene,
                    camera
                );

            };


            animate();


            /* ---------------------------------------------
               RESIZE
            --------------------------------------------- */

            window.addEventListener(
                "resize",
                () => {

                    camera.aspect =
                        window.innerWidth /
                        window.innerHeight;

                    camera.updateProjectionMatrix();


                    renderer.setSize(
                        window.innerWidth,
                        window.innerHeight
                    );

                }
            );


        } catch (error) {

            console.warn(
                "3D background disabled:",
                error
            );

            canvas.style.display = "none";

        }

    }


    /* =====================================================
       CARD 3D TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".work-card, .service-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                if (
                    !window.matchMedia(
                        "(pointer:fine)"
                    ).matches
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    e.clientX -
                    rect.left;


                const y =
                    e.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       YEAR
    ===================================================== */

    const year =
        document.querySelector("[data-year]");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


});