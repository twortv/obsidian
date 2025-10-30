/**
 * TOC EXPAND/COLLAPSE & ACTIVE HIGHLIGHTING
 * Tự động xử lý TOC structure từ Eleventy TOC plugin
 */

(function() {
    'use strict';
    
    // Khởi tạo TOC
    function initTOC() {
        const tocContainer = document.querySelector('.toc-container');
        
        if (!tocContainer) {
            console.log('TOC container not found');
            return;
        }
        
        console.log('Initializing TOC...');
        
        // Xử lý expand/collapse
        processExpandCollapse(tocContainer);
        
        // Highlight active section
        highlightActiveSection();
        
        // Listen scroll để update active section
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    highlightActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        console.log('TOC initialized successfully');
    }
    
    // Xử lý expand/collapse cho TOC
    function processExpandCollapse(tocContainer) {
        // Tìm tất cả các <ol> hoặc <ul> trong TOC
        const allLists = tocContainer.querySelectorAll('ol, ul');
        
        allLists.forEach(function(list) {
            const items = list.children;
            
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                
                // Kiểm tra xem item có children list không
                const childList = item.querySelector('ol, ul');
                
                if (childList) {
                    // Item này có children, cần thêm toggle
                    const link = item.querySelector('a');
                    
                    if (link) {
                        // Tạo wrapper
                        const wrapper = document.createElement('div');
                        wrapper.className = 'toc-item-wrapper';
                        
                        // Tạo toggle button
                        const toggle = document.createElement('span');
                        toggle.className = 'toc-toggle expanded';
                        toggle.setAttribute('role', 'button');
                        toggle.setAttribute('tabindex', '0');
                        toggle.setAttribute('aria-label', 'Toggle section');
                        toggle.setAttribute('aria-expanded', 'true');
                        
                        // Tạo children wrapper
                        const childrenWrapper = document.createElement('div');
                        childrenWrapper.className = 'toc-children';
                        
                        // Lấy tất cả nội dung hiện tại của item
                        const originalContent = Array.from(item.childNodes);
                        
                        // Thêm toggle và link vào wrapper
                        wrapper.appendChild(toggle);
                        wrapper.appendChild(link.cloneNode(true));
                        
                        // Thêm children vào childrenWrapper (trừ link đã clone)
                        originalContent.forEach(function(node) {
                            if (node !== link) {
                                childrenWrapper.appendChild(node);
                            }
                        });
                        
                        wrapper.appendChild(childrenWrapper);
                        
                        // Clear item và thêm wrapper
                        item.innerHTML = '';
                        item.appendChild(wrapper);
                        
                        // Thêm event listeners
                        toggle.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSection(toggle, childrenWrapper);
                        });
                        
                        // Keyboard support
                        toggle.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleSection(toggle, childrenWrapper);
                            }
                        });
                    }
                }
            }
        });
    }
    
    // Toggle section expand/collapse
    function toggleSection(toggle, childrenWrapper) {
        const isExpanded = toggle.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            toggle.classList.remove('expanded');
            childrenWrapper.classList.add('collapsed');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            // Expand
            toggle.classList.add('expanded');
            childrenWrapper.classList.remove('collapsed');
            toggle.setAttribute('aria-expanded', 'true');
        }
    }
    
    // Highlight section đang active dựa vào scroll position
    function highlightActiveSection() {
        const tocLinks = document.querySelectorAll('.toc-container a');
        
        if (tocLinks.length === 0) return;
        
        const scrollPos = window.scrollY + 100; // Offset
        let currentSection = null;
        
        // Tìm section gần nhất với scroll position
        tocLinks.forEach(function(link) {
            const targetId = link.getAttribute('href');
            
            if (!targetId || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const elementTop = targetElement.offsetTop;
            
            if (scrollPos >= elementTop) {
                currentSection = link;
            }
        });
        
        // Remove tất cả active classes
        tocLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        
        // Add active class vào current section
        if (currentSection) {
            currentSection.classList.add('active');
            
            // Auto expand parents nếu bị collapse
            expandParents(currentSection);
        }
    }
    
    // Expand tất cả parent sections của active link
    function expandParents(element) {
        let parent = element.parentElement;
        
        while (parent && !parent.classList.contains('toc-container')) {
            if (parent.classList.contains('toc-children') && parent.classList.contains('collapsed')) {
                // Tìm toggle button
                const wrapper = parent.parentElement;
                if (wrapper && wrapper.classList.contains('toc-item-wrapper')) {
                    const toggle = wrapper.querySelector('.toc-toggle');
                    if (toggle) {
                        toggle.classList.add('expanded');
                        parent.classList.remove('collapsed');
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                }
            }
            parent = parent.parentElement;
        }
    }
    
    // Smooth scroll khi click vào TOC link
    function setupSmoothScroll() {
        const tocLinks = document.querySelectorAll('.toc-container a');
        
        tocLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                        
                        // Update URL without triggering scroll
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }
    
    // Initialize khi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                initTOC();
                setupSmoothScroll();
            }, 100);
        });
    } else {
        setTimeout(function() {
            initTOC();
            setupSmoothScroll();
        }, 100);
    }
    
})();