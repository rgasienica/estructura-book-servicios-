# Visual Inspection Checklist

This document is a comprehensive checklist of items to verify during web design visual inspection.

---

## 1. Layout Verification

### Structural Integrity

- [ ] Header is correctly fixed/positioned at the top of the screen
- [ ] Footer is positioned at the bottom of the screen or end of content
- [ ] Main content area is center-aligned with appropriate width
- [ ] Sidebar (if present) is positioned correctly
- [ ] Navigation is displayed in the intended position

### Overflow

- [ ] Horizontal scrollbar is not unintentionally displayed
- [ ] Content does not overflow from parent elements
- [ ] Images fit within parent containers
- [ ] Tables do not exceed container width
- [ ] Code blocks wrap or scroll appropriately

### Alignment

- [ ] Grid items are evenly distributed
- [ ] Flex item alignment is correct
- [ ] Text alignment (left/center/right) is consistent
- [ ] Icons and text are vertically aligned
- [ ] Form labels and input fields are correctly positioned

---

## 2. Typography Verification

### Readability

- [ ] Body text font size is sufficient (minimum 16px recommended)
- [ ] Line height is appropriate (1.5-1.8 recommended)
- [ ] Characters per line is appropriate (40-80 characters recommended)
- [ ] Spacing between paragraphs is sufficient
- [ ] Heading size hierarchy is clear

### Text Handling

- [ ] Long words wrap appropriately
- [ ] URLs and code are handled properly
- [ ] No text clipping occurs
- [ ] Ellipsis (...) displays correctly
- [ ] Language-specific line breaking rules work correctly

### Fonts

- [ ] Web fonts load correctly
- [ ] Fallback fonts are appropriate
- [ ] Font weights are as intended
- [ ] Special characters and emoji display correctly

---

## 3. Color & Contrast Verification

### Color Usage

- [ ] Brand colors are used consistently
- [ ] Color palette is limited and purposeful
- [ ] Color contrast meets accessibility standards
- [ ] Hover and focus states use appropriate colors
- [ ] Error states are clearly distinguishable

### Contrast Ratios

- [ ] Normal text: 4.5:1 minimum contrast ratio
- [ ] Large text: 3:1 minimum contrast ratio
- [ ] Interactive elements: sufficient contrast in all states
- [ ] Images with text: sufficient contrast
- [ ] Color is not the only way information is conveyed

---

## 4. Responsive Verification

### Breakpoints

- [ ] Layout adapts correctly at common breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Content reflows naturally when screen size changes
- [ ] No horizontal scrolling on mobile devices
- [ ] Touch targets are appropriately sized (minimum 44px)
- [ ] Images scale properly on all screen sizes

### Mobile-Specific

- [ ] Navigation is accessible on mobile (hamburger menu, etc.)
- [ ] Forms are usable on mobile devices
- [ ] Text is readable without zooming
- [ ] Buttons and links are easy to tap
- [ ] Content is prioritized for small screens

---

## 5. Interactive Element Verification

### Buttons

- [ ] Default state is clear
- [ ] Hover state exists (desktop)
- [ ] Focus state is visually clear
- [ ] Active (pressed) state exists
- [ ] Disabled state is distinguishable
- [ ] Loading state (if applicable)

### Links

- [ ] Links are visually identifiable
- [ ] Visited links are distinguishable (if needed)
- [ ] Hover state exists
- [ ] Focus state is clear

### Form Elements

- [ ] Input field boundaries are clear
- [ ] Placeholder text contrast is appropriate
- [ ] Visual feedback on focus
- [ ] Error state display
- [ ] Required field indication
- [ ] Dropdowns function correctly

---

## 6. Images & Media Verification

### Images

- [ ] Images display at appropriate size
- [ ] Aspect ratio is maintained
- [ ] High resolution display support (@2x)
- [ ] Display when image fails to load
- [ ] Lazy loading behavior works

### Video & Embeds

- [ ] Videos fit within containers
- [ ] Aspect ratio is maintained
- [ ] Embedded content is responsive
- [ ] iframes don't overflow

---

## 7. Accessibility Verification

### Keyboard Navigation

- [ ] All interactive elements accessible via Tab key
- [ ] Focus order is logical
- [ ] Focus traps are appropriate (modals, etc.)
- [ ] Skip to content link exists

### Screen Reader Support

- [ ] Images have alt text
- [ ] Forms have labels
- [ ] ARIA labels are appropriately set
- [ ] Heading hierarchy is correct (h1→h2→h3...)

### Motion

- [ ] Animations are not excessive
- [ ] prefers-reduced-motion is supported (if possible)

---

## 8. Performance-related Visual Issues

### Loading

- [ ] Content loads progressively
- [ ] Loading states are provided for dynamic content
- [ ] Skeleton screens or spinners are used appropriately
- [ ] No layout shift during loading (CLS)

### Animation

- [ ] Animations are smooth (60fps)
- [ ] Animations don't cause performance issues
- [ ] Reduced motion preferences are respected
- [ ] Animation duration is appropriate (200-500ms)

---

## Priority Matrix

| Priority | Issues | Action |
|----------|--------|--------|
| **P1 - Critical** | Layout breaks, accessibility violations, functionality blocking | Fix immediately |
| **P2 - High** | Poor UX, contrast issues, responsive problems | Fix in next iteration |
| **P3 - Medium** | Inconsistencies, minor visual issues | Fix if time allows |
| **P4 - Low** | Nitpicks, optimization opportunities | Document for future |

---

## Verification Tools

### Automated Tools

- [ ] Lighthouse (accessibility, performance, SEO)
- [ ] axe DevTools (accessibility)
- [ ] WAVE (accessibility)
- [ ] Color Contrast Analyzer
- [ ] Browser DevTools (responsive testing)

### Manual Testing

- [ ] Keyboard-only navigation
- [ ] Screen reader testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing
- [ ] High contrast mode testing
- [ ] Reduced motion testing