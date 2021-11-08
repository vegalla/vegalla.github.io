/**
 * scroller
 * handles the details of figuring out which section
 * the user is currently scrolled on
 */

function scroller(){
    let container = d3.select('body')
    // event dispatcher
    let dispatch = d3.dispatch('active', 'progress');
    // d3 selection of text sections that will be scrolled through
    let sections = d3.selectAll('.step')
    // empty array that will hold the y coordinate of each section that will be scrolled through
    let sectionPositions
   
    let currentIndex = -1
    // initial y coordinate
    let containerStart = 0;

    /**
     * scroll - constructor function.
     * sets up scroller to monitor scrolling of text sections
     */
    function scroll(){
        // when window is scrolled, call position function
        // when window is resized, call resize function
            // the resize function is important for building a dynamic web page that adapts to screen resolution
        d3.select(window)
            .on('scroll.scroller', position)
            .on('resize.scroller', resize)

        // manually call resize to initially set up scroller
        resize();

        // 'hack' to get position to be called once for scroll position on load
        let timer = d3.timer(function() {
            position();
            timer.stop();
        });
    }

    /**
     * resize - called initially and when page is resized.
     * resets the sectionPositions
     */
    function resize(){
        sectionPositions = [];
        let startPos;
    
        sections.each(function(d, i) {
            let top = this.getBoundingClientRect().top;
        
            if (i === 0 ){
                startPos = top;
            }
            sectionPositions.push(top - startPos)
        });
    }

    /**
     * position - get current users position
     * if user has scrolled to new section, dispatch active event with new section index
     */
    function position() {
        let pos = window.pageYOffset - 300 - containerStart;
        let sectionIndex = d3.bisect(sectionPositions, pos);
        sectionIndex = Math.min(sections.size()-1, sectionIndex);
    
        if (currentIndex !== sectionIndex){
            dispatch.call('active', this, sectionIndex);
            currentIndex = sectionIndex;
        }
    
        let prevIndex = Math.max(sectionIndex - 1, 0);
        let prevTop = sectionPositions[prevIndex]
        let progress = (pos - prevTop) / (sectionPositions[sectionIndex] - prevTop);
        dispatch.call('progress', this, currentIndex, progress)
    }

    /**
     * container - get/set the parent element of the sections
     * useful for if the scrolling doesn't start at the very top of the page
     * for example, when the page is refreshed but doesn't reset at the top of the page
     */
    scroll.container = function(value) {
        if (arguments.legth === 0){
            return container
        } 
        container = value 
        return scroll 
    }

    scroll.on = function(action, callback){
        dispatch.on(action, callback)
    };

    return scroll;
}

