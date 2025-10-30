/**
 * TOC EXPAND/COLLAPSE FUNCTIONALITY
 * Tự động thêm chức năng expand/collapse cho Table of Contents
 */

(function() {
    'use strict';
    
    // Chờ DOM load xong
    function initTOC() {
        const tocContainer = document.querySelector('.toc-container');
        
        if (!tocContainer) {
            return;
        }
        
        // Tìm tất cả các list items có children
        const processListItems = (parentList) => {
            const items = parentList.children;
            
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const childList = item.querySelector('ul, ol');
                
                if (childList) {
                    // Tạo wrapper
                    const wrapper = document.createElement('div');
                    wrapper.className = 'toc-item-wrapper';
                    
                    // Tạo toggle button
                    const toggle = document.createElement('span');
                    toggle.className = 'toc-toggle expanded';
                    toggle.setAttribute('aria-label', 'Toggle section');
                    toggle.setAttribute('role', 'button');
                    toggle.setAttribute('tabindex', '0');
                    
                    // Wrap children list
                    const childrenWrapper = document.createElement('div');
                    childrenWrapper.className = 'toc-children';
                    
                    // Di chuyển child list vào wrapper
                    const originalLink = item.querySelector('a');
                    if (originalLink) {
                        // Clone cấu trúc
                        const linkClone = originalLink.cloneNode(true);
                        wrapper.appendChild(toggle);
                        wrapper.appendChild(linkClone);
                        
                        // Xử lý children
                        childrenWrapper.appendChild(childList);
                        wrapper.appendChild(childrenWrapper);
                        
                        // Thay thế nội dung item
                        item.innerHTML = '';
                        item.appendChild(wrapper);
                        
                        // Xử lý đệ quy cho children
                        processListItems(childList);
                        
                        // Thêm event listener
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
        };
        
        // Toggle function
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
        
        // Bắt đầu xử lý từ root list
        const rootLists = tocContainer.querySelectorAll(':scope > ul, :scope > ol');
        rootLists.forEach(rootList => {
            processListItems(rootList);
        });
        
        // Highlight active section khi scroll
        highlightActiveSection();
        window.addEventListener('scroll', highlightActiveSection);
    }
    
    // Highlight section đang active
    function highlightActiveSection() {
        const tocLinks = document.querySelectorAll('.toc-container a');
        const scrollPos = window.scrollY + 100; // Offset
        
        let currentSection = null;
        
        tocLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const elementTop = targetElement.offsetTop;
            
            if (scrollPos >= elementTop) {
                currentSection = link;
            }
        });
        
        // Remove all active classes
        tocLinks.forEach(link => link.classList.remove('active'));
        
        // Add active to current
        if (currentSection) {
            currentSection.classList.add('active');
            
            // Expand parents if collapsed
            expandParents(currentSection);
        }
    }
    
    // Expand tất cả parent sections của active link
    function expandParents(element) {
        let parent = element.parentElement;
        
        while (parent && !parent.classList.contains('toc-container')) {
            if (parent.classList.contains('toc-children') && parent.classList.contains('collapsed')) {
                const toggle = parent.previousElementSibling;
                if (toggle && toggle.classList.contains('toc-toggle')) {
                    toggle.classList.add('expanded');
                    parent.classList.remove('collapsed');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
            parent = parent.parentElement;
        }
    }
    
    // Collapse All / Expand All buttons (optional feature)
    function addCollapseExpandButtons() {
        const tocTitleContainer = document.querySelector('.toc-title-container');
        if (!tocTitleContainer) return;
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = 'display: flex; gap: 8px; margin-left: auto;';
        
        const collapseAllBtn = document.createElement('button');
        collapseAllBtn.textContent = 'Thu gọn tất cả';
        collapseAllBtn.className = 'toc-collapse-all-btn';
        collapseAllBtn.style.cssText = 'font-size: 0.8rem; padding: 2px 8px; cursor: pointer; background: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 3px; color: var(--text-muted);';
        
        const expandAllBtn = document.createElement('button');
        expandAllBtn.textContent = 'Mở tất cả';
        expandAllBtn.className = 'toc-expand-all-btn';
        expandAllBtn.style.cssText = 'font-size: 0.8rem; padding: 2px 8px; cursor: pointer; background: var(--background-secondary); border: 1px solid var(--background-modifier-border); border-radius: 3px; color: var(--text-muted);';
        
        collapseAllBtn.addEventListener('click', () => {
            document.querySelectorAll('.toc-toggle').forEach(toggle => {
                toggle.classList.remove('expanded');
                toggle.setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.toc-children').forEach(children => {
                children.classList.add('collapsed');
            });
        });
        
        expandAllBtn.addEventListener('click', () => {
            document.querySelectorAll('.toc-toggle').forEach(toggle => {
                toggle.classList.add('expanded');
                toggle.setAttribute('aria-expanded', 'true');
            });
            document.querySelectorAll('.toc-children').forEach(children => {
                children.classList.remove('collapsed');
            });
        });
        
        buttonsContainer.appendChild(collapseAllBtn);
        buttonsContainer.appendChild(expandAllBtn);
        
        // Make title container flex
        tocTitleContainer.style.display = 'flex';
        tocTitleContainer.style.alignItems = 'center';
        tocTitleContainer.appendChild(buttonsContainer);
    }
    
    // Initialize khi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initTOC, 100); // Small delay để đảm bảo TOC đã render
            // addCollapseExpandButtons(); // Uncomment nếu muốn thêm nút collapse/expand all
        });
    } else {
        setTimeout(initTOC, 100);
        // addCollapseExpandButtons(); // Uncomment nếu muốn thêm nút collapse/expand all
    }
})();