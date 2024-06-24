class TypingAnimation {
  constructor(elementId, strings, typeSpeed = 70, backSpeed = 30, loop = true) {
    this.typed = new Typed(elementId, {
      strings: strings,
      typeSpeed: typeSpeed,
      backSpeed: backSpeed,
      loop: loop,
    });
  }
}

class Counter {
  constructor(selector, target, increment, interval) {
    this.counterElement = document.querySelector(selector);
    this.target = target;
    this.increment = increment;
    this.interval = interval;
    this.count = 0;
  }

  startCounting() {
    if (parseInt(this.counterElement.textContent) !== 0) {
      return;
    }

    const duration = Math.floor(this.interval / this.target);
    const counter = setInterval(() => {
      this.count += this.increment;
      this.counterElement.textContent = this.count;
      if (this.count >= this.target) {
        this.counterElement.textContent = `${this.count}+`;
        clearInterval(counter);
      }
    }, duration);
  }
}

function startCountersIfNeeded() {
  const followersCounter = new Counter('#followers-text', 70000, 50, 4000);
  const subscribersCounter = new Counter('#subscribers-text', 4000, 10, 4000);

  followersCounter.startCounting();
  subscribersCounter.startCounting();
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScrollForCounters() {
  const countersSection = document.querySelector('#stat-counter-section');
  if (isInViewport(countersSection)) {
    startCountersIfNeeded();
    window.removeEventListener('scroll', handleScrollForCounters);
  }
}

// Check if counters section is in viewport, if yes, start counting
window.addEventListener('scroll', handleScrollForCounters);

// Initialize typing animation
const typingAnimation = new TypingAnimation("#typing-text", ["Aspiring Data Scientist"]);

window.addEventListener("scroll", function () {
  const header = document.querySelector(".navbar");
  if (window.scrollY > 250) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

(function(){
  // Vertical Timeline - by CodyHouse.co
	function VerticalTimeline( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName("cd-timeline__block");
		this.images = this.element.getElementsByClassName("cd-timeline__img");
		this.contents = this.element.getElementsByClassName("cd-timeline__content");
		this.offset = 0.8;
		this.hideBlocks();
	};

	VerticalTimeline.prototype.hideBlocks = function() {
		if ( !"classList" in document.documentElement ) {
			return; // no animation on older browsers
		}
		//hide timeline blocks which are outside the viewport
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
					self.images[i].classList.add("cd-timeline__img--hidden"); 
					self.contents[i].classList.add("cd-timeline__content--hidden"); 
				}
			})(i);
		}
	};

	VerticalTimeline.prototype.showBlocks = function() {
		if ( ! "classList" in document.documentElement ) {
			return;
		}
		var self = this;
		for( var i = 0; i < this.blocks.length; i++) {
			(function(i){
				if( self.contents[i].classList.contains("cd-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
					// add bounce-in animation
					self.images[i].classList.add("cd-timeline__img--bounce-in");
					self.contents[i].classList.add("cd-timeline__content--bounce-in");
					self.images[i].classList.remove("cd-timeline__img--hidden");
					self.contents[i].classList.remove("cd-timeline__content--hidden");
				}
			})(i);
		}
	};

	var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
		verticalTimelinesArray = [],
		scrolling = false;
	if( verticalTimelines.length > 0 ) {
		for( var i = 0; i < verticalTimelines.length; i++) {
			(function(i){
				verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
			})(i);
		}

		//show timeline blocks on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
			}
		});
	}

	function checkTimelineScroll() {
		verticalTimelinesArray.forEach(function(timeline){
			timeline.showBlocks();
		});
		scrolling = false;
	};
})();