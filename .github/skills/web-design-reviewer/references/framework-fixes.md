# Framework-specific Fix Guide

## Common Patterns

### Fixing Flexbox Layout Issues

**Problem**: Elements not aligning properly in flex containers.

**Solutions**:

1. **Center alignment issues**:
   ```css
   .container {
     display: flex;
     justify-content: center; /* Horizontal centering */
     align-items: center; /* Vertical centering */
   }
   ```

2. **Wrapping issues**:
   ```css
   .container {
     display: flex;
     flex-wrap: wrap; /* Allow items to wrap */
     gap: 1rem; /* Add spacing between items */
   }
   ```

3. **Equal height columns**:
   ```css
   .item {
     flex: 1; /* Equal flex grow */
   }
   ```

### Fixing Grid Layout Issues

**Problem**: Grid items not positioning correctly.

**Solutions**:

1. **Responsive grid**:
   ```css
   .grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
     gap: 1rem;
   }
   ```

2. **Fixed columns**:
   ```css
   .grid {
     display: grid;
     grid-template-columns: 1fr 2fr 1fr; /* Three columns */
     gap: 1rem;
   }
   ```

### Organizing z-index

**Problem**: Elements overlapping incorrectly.

**Solutions**:

1. **Layer system**:
   ```css
   :root {
     --z-dropdown: 1000;
     --z-sticky: 1020;
     --z-fixed: 1030;
     --z-modal-backdrop: 1040;
     --z-modal: 1050;
     --z-popover: 1060;
     --z-tooltip: 1070;
   }
   ```

2. **Usage**:
   ```css
   .modal {
     z-index: var(--z-modal);
   }
   ```

### Adding Focus States

**Problem**: Keyboard navigation not visible.

**Solutions**:

1. **Basic focus outline**:
   ```css
   .button:focus {
     outline: 2px solid #007acc;
     outline-offset: 2px;
   }
   ```

2. **Accessible focus ring**:
   ```css
   .button:focus-visible {
     outline: 2px solid #007acc;
     outline-offset: 2px;
   }
   ```

### Fixing Responsive Typography

**Problem**: Text not scaling properly on different screens.

**Solutions**:

1. **Fluid typography**:
   ```css
   .title {
     font-size: clamp(1.5rem, 4vw, 3rem);
   }
   ```

2. **Breakpoint-specific sizes**:
   ```css
   .title {
     font-size: 1.5rem;
   }

   @media (min-width: 768px) {
     .title {
       font-size: 2rem;
     }
   }

   @media (min-width: 1024px) {
     .title {
       font-size: 2.5rem;
     }
   }
   ```

### Fixing Color Contrast Issues

**Problem**: Text not readable against background.

**Solutions**:

1. **Increase contrast**:
   ```css
   .text {
     color: #000000; /* Instead of #666666 */
   }
   ```

2. **Add background**:
   ```css
   .text-on-image {
     background: rgba(255, 255, 255, 0.9);
     padding: 0.5rem;
     border-radius: 4px;
   }
   ```

### Fixing Overflow Issues

**Problem**: Content spilling outside containers.

**Solutions**:

1. **Text overflow**:
   ```css
   .text {
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
   ```

2. **Container overflow**:
   ```css
   .container {
     overflow-x: auto; /* Horizontal scroll if needed */
     overflow-y: hidden; /* Prevent vertical overflow */
   }
   ```

### Adding Spacing Consistency

**Problem**: Inconsistent margins and padding.

**Solutions**:

1. **Spacing scale**:
   ```css
   :root {
     --space-xs: 0.25rem;
     --space-sm: 0.5rem;
     --space-md: 1rem;
     --space-lg: 1.5rem;
     --space-xl: 3rem;
   }
   ```

2. **Usage**:
   ```css
   .element {
     margin: var(--space-md);
     padding: var(--space-sm);
   }
   ```

### Fixing Button Accessibility

**Problem**: Buttons not accessible.

**Solutions**:

1. **Minimum touch target**:
   ```css
   .button {
     min-height: 44px; /* iOS minimum */
     min-width: 44px;
     padding: 0.75rem 1.5rem;
   }
   ```

2. **Focus management**:
   ```css
   .button:focus {
     outline: 2px solid currentColor;
     outline-offset: 2px;
   }
   ```

### Fixing Image Responsiveness

**Problem**: Images not scaling properly.

**Solutions**:

1. **Responsive images**:
   ```css
   .image {
     max-width: 100%;
     height: auto;
   }
   ```

2. **Aspect ratio containers**:
   ```css
   .aspect-ratio-box {
     aspect-ratio: 16 / 9;
     overflow: hidden;
   }

   .aspect-ratio-box img {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   ```

### Adding Animation Performance

**Problem**: Animations causing performance issues.

**Solutions**:

1. **Use transform and opacity**:
   ```css
   .animated {
     transition: transform 0.3s ease, opacity 0.3s ease;
   }

   .animated:hover {
     transform: translateY(-2px);
     opacity: 0.9;
   }
   ```

2. **Reduce motion preference**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animated {
       transition: none;
     }
   }
   ```

### Fixing Form Layout Issues

**Problem**: Form elements not aligning properly.

**Solutions**:

1. **Label and input alignment**:
   ```css
   .form-group {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
   }

   .form-row {
     display: flex;
     align-items: center;
     gap: 1rem;
   }
   ```

2. **Consistent input heights**:
   ```css
   .input, .select, .textarea {
     height: 2.5rem; /* Consistent height */
     padding: 0.5rem;
   }

   .textarea {
     height: auto; /* Override for textarea */
     min-height: 5rem;
   }
   ```

### Adding Loading States

**Problem**: No feedback during loading.

**Solutions**:

1. **Loading spinner**:
   ```css
   .loading {
     display: inline-block;
     width: 1rem;
     height: 1rem;
     border: 2px solid #f3f3f3;
     border-top: 2px solid #3498db;
     border-radius: 50%;
     animation: spin 1s linear infinite;
   }

   @keyframes spin {
     0% { transform: rotate(0deg); }
     100% { transform: rotate(360deg); }
   }
   ```

2. **Skeleton loading**:
   ```css
   .skeleton {
     background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
     background-size: 200% 100%;
     animation: loading 1.5s infinite;
   }

   @keyframes loading {
     0% { background-position: 200% 0; }
     100% { background-position: -200% 0; }
   }
   ```

### Fixing Modal/Dialog Positioning

**Problem**: Modals not centered or positioned correctly.

**Solutions**:

1. **Centered modal**:
   ```css
   .modal {
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 1050;
   }
   ```

2. **Modal backdrop**:
   ```css
   .modal-backdrop {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: rgba(0, 0, 0, 0.5);
     z-index: 1040;
   }
   ```

### Adding Print Styles

**Problem**: Content not printable.

**Solutions**:

1. **Hide irrelevant content**:
   ```css
   @media print {
     .no-print {
       display: none !important;
     }
   }
   ```

2. **Optimize for print**:
   ```css
   @media print {
     body {
       font-size: 12pt;
       line-height: 1.4;
     }

     .page-break {
       page-break-before: always;
     }
   }
   ```