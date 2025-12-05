<svelte:options customElement="aegis-datetime-picker" />

<script>
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
  import {
    parseCanonical, toCanonical, toDateString, toTimeString,
    formatDate, formatTime, parseDate, parseTime,
    getToday, getYesterday, getNextMonth, getNextYear,
    getDaysInMonth, getFirstDayOfMonth, isSameDay, isInRange,
    setDatePortion, setTimePortion, cloneDate,
    MONTH_NAMES, WEEKDAY_NAMES, pad
  } from './dateUtils.js';

  // ========== Props (attributes) ==========
  export let mode = 'datetime'; // 'date' | 'time' | 'datetime'
  export let value = null;
  export let min = null;
  export let max = null;
  export let required = false;
  export let name = '';
  export let popup = false;
  
  // Attribute names with dashes are mapped to camelCase
  // Using exports with dash names for attribute reflection
  let dateFormatProp = 'YYYY-MM-DD';
  let timeFormatProp = 'HH:mm';
  let showQuickDatesProp = false;
  
  // Handle kebab-case attributes
  export { dateFormatProp as 'date-format' };
  export { timeFormatProp as 'time-format' };
  export { showQuickDatesProp as 'show-quick-dates' };

  const dispatch = createEventDispatcher();

  // ========== Internal State ==========
  let internalDate = null; // Date object
  let isPopupOpen = false;
  let isValid = true;
  let validationMessage = '';
  
  // Calendar navigation state
  let viewYear = new Date().getFullYear();
  let viewMonth = new Date().getMonth();
  
  // Input field values for editing
  let dateInputValue = '';
  let timeInputValue = '';
  let dateInputInvalid = false;
  let timeInputInvalid = false;
  
  // Time field values
  let hourValue = '00';
  let minuteValue = '00';
  let ampmValue = 'AM';
  
  // References
  let rootElement;
  let popupElement;
  let triggerElement;
  let calendarGrid;
  let focusedDayIndex = -1;
  
  // Track last synced value to avoid cycles
  let lastSyncedValue = null;

  // ========== Computed Properties ==========
  $: dateFormat = dateFormatProp || 'YYYY-MM-DD';
  $: timeFormat = timeFormatProp || 'HH:mm';
  $: is12h = timeFormat.includes('hh');
  $: hasAmPm = timeFormat.includes('A');
  
  $: showDateUI = mode === 'date' || mode === 'datetime';
  $: showTimeUI = mode === 'time' || mode === 'datetime';
  $: showQuickDates = showDateUI || (showQuickDatesProp && mode === 'time');
  
  $: minDate = min ? parseCanonical(min) : null;
  $: maxDate = max ? parseCanonical(max) : null;
  
  // Computed properties as functions to avoid cycles
  function getCanonicalValue() {
    return internalDate ? toCanonical(internalDate) : null;
  }
  
  function getDateValue() {
    return internalDate ? toDateString(internalDate) : null;
  }
  
  function getTimeValue() {
    return internalDate ? toTimeString(internalDate) : null;
  }
  
  // Reactive recalculation trigger (for template reactivity)
  $: canonicalValue = internalDate ? toCanonical(internalDate) : null;
  $: dateValue = internalDate ? toDateString(internalDate) : null;
  $: timeValue = internalDate ? toTimeString(internalDate) : null;

  // ========== Lifecycle ==========
  onMount(() => {
    // Parse initial value if provided
    if (value) {
      const parsed = parseCanonical(value);
      if (parsed) {
        internalDate = parsed;
        lastSyncedValue = value;
        updateViewFromDate();
        updateInputFields();
      }
    }
    
    // Add click outside listener for popup
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleGlobalKeydown);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleGlobalKeydown);
  });

  // Watch for external value changes (from attribute/property set)
  $: handleValueChange(value);
  
  function handleValueChange(newValue) {
    // Skip if this is our own update
    if (newValue === lastSyncedValue) return;
    
    const currentCanonical = getCanonicalValue();
    if (newValue === currentCanonical) {
      lastSyncedValue = newValue;
      return;
    }
    
    if (newValue) {
      const parsed = parseCanonical(newValue);
      if (parsed) {
        internalDate = parsed;
        lastSyncedValue = newValue;
        updateViewFromDate();
        updateInputFields();
        validate();
      }
    } else {
      internalDate = null;
      lastSyncedValue = null;
      updateInputFields();
      validate();
    }
  }

  // ========== Methods ==========
  function updateViewFromDate() {
    if (internalDate) {
      viewYear = internalDate.getFullYear();
      viewMonth = internalDate.getMonth();
    }
  }

  function updateInputFields() {
    if (internalDate) {
      dateInputValue = formatDate(internalDate, dateFormat);
      timeInputValue = formatTime(internalDate, timeFormat);
      hourValue = pad(is12h ? (internalDate.getHours() % 12 || 12) : internalDate.getHours());
      minuteValue = pad(internalDate.getMinutes());
      ampmValue = internalDate.getHours() < 12 ? 'AM' : 'PM';
    } else {
      dateInputValue = '';
      timeInputValue = '';
      hourValue = '00';
      minuteValue = '00';
      ampmValue = 'AM';
    }
    dateInputInvalid = false;
    timeInputInvalid = false;
  }

  function validate() {
    validationMessage = '';
    
    if (required && !internalDate) {
      isValid = false;
      validationMessage = 'This field is required';
      return false;
    }
    
    if (internalDate && !isInRange(internalDate, minDate, maxDate)) {
      isValid = false;
      validationMessage = 'Value is out of range';
      return false;
    }
    
    isValid = true;
    return true;
  }

  function setValue(newDate) {
    if (newDate && !isInRange(newDate, minDate, maxDate)) {
      isValid = false;
      validationMessage = 'Value is out of range';
      return false;
    }
    
    internalDate = newDate;
    updateInputFields();
    validate();
    
    // Update exposed value and track it to avoid cycles
    const newCanonical = getCanonicalValue();
    lastSyncedValue = newCanonical;
    value = newCanonical;
    
    return true;
  }

  function emitEvents() {
    const currentValue = getCanonicalValue();
    const detail = { value: currentValue };
    dispatch('input', detail);
    dispatch('change', detail);
    
    // Also dispatch native events for form compatibility
    if (rootElement) {
      rootElement.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, detail }));
      rootElement.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail }));
    }
  }

  // ========== Date Input Handlers ==========
  function handleDateInputBlur() {
    if (!dateInputValue.trim()) {
      if (mode === 'date') {
        setValue(null);
        emitEvents();
      }
      dateInputInvalid = false;
      return;
    }
    
    const parsed = parseDate(dateInputValue, dateFormat);
    if (parsed) {
      const newDate = internalDate ? cloneDate(internalDate) : new Date(1970, 0, 1, 0, 0);
      newDate.setFullYear(parsed.year, parsed.month - 1, parsed.day);
      
      if (setValue(newDate)) {
        updateViewFromDate();
        emitEvents();
        dateInputInvalid = false;
      } else {
        dateInputInvalid = true;
      }
    } else {
      dateInputInvalid = true;
      // Revert to last valid value
      dateInputValue = internalDate ? formatDate(internalDate, dateFormat) : '';
    }
  }

  function handleDateInputKeydown(e) {
    if (e.key === 'Enter') {
      handleDateInputBlur();
    }
  }

  // ========== Time Input Handlers ==========
  function handleTimeInputBlur() {
    if (!timeInputValue.trim()) {
      if (mode === 'time') {
        setValue(null);
        emitEvents();
      }
      timeInputInvalid = false;
      return;
    }
    
    const parsed = parseTime(timeInputValue, timeFormat);
    if (parsed) {
      const newDate = internalDate ? cloneDate(internalDate) : new Date(1970, 0, 1, 0, 0);
      newDate.setHours(parsed.hours, parsed.minutes, 0, 0);
      
      if (setValue(newDate)) {
        emitEvents();
        timeInputInvalid = false;
      } else {
        timeInputInvalid = true;
      }
    } else {
      timeInputInvalid = true;
      // Revert to last valid value
      timeInputValue = internalDate ? formatTime(internalDate, timeFormat) : '';
    }
  }

  function handleTimeInputKeydown(e) {
    if (e.key === 'Enter') {
      handleTimeInputBlur();
    }
  }

  // ========== Hour/Minute Field Handlers ==========
  function adjustHour(delta) {
    let hour = parseInt(hourValue, 10) || 0;
    
    if (is12h) {
      hour += delta;
      if (hour > 12) hour = 1;
      if (hour < 1) hour = 12;
    } else {
      hour += delta;
      if (hour > 23) hour = 0;
      if (hour < 0) hour = 23;
    }
    
    hourValue = pad(hour);
    commitTimeChange();
  }

  function adjustMinute(delta) {
    let minute = parseInt(minuteValue, 10) || 0;
    minute += delta;
    if (minute > 59) minute = 0;
    if (minute < 0) minute = 59;
    minuteValue = pad(minute);
    commitTimeChange();
  }

  function toggleAmPm() {
    ampmValue = ampmValue === 'AM' ? 'PM' : 'AM';
    commitTimeChange();
  }

  function commitTimeChange() {
    let hour = parseInt(hourValue, 10) || 0;
    const minute = parseInt(minuteValue, 10) || 0;
    
    // Convert to 24h if needed
    if (is12h && hasAmPm) {
      if (ampmValue === 'AM' && hour === 12) hour = 0;
      else if (ampmValue === 'PM' && hour !== 12) hour += 12;
    }
    
    const newDate = internalDate ? cloneDate(internalDate) : new Date(1970, 0, 1, 0, 0);
    newDate.setHours(hour, minute, 0, 0);
    
    if (setValue(newDate)) {
      emitEvents();
    }
  }

  function handleHourKeydown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjustHour(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjustHour(-1);
    }
  }

  function handleMinuteKeydown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjustMinute(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjustMinute(-1);
    }
  }

  function handleHourBlur() {
    let hour = parseInt(hourValue, 10);
    if (isNaN(hour)) hour = 0;
    if (is12h) {
      hour = Math.max(1, Math.min(12, hour));
    } else {
      hour = Math.max(0, Math.min(23, hour));
    }
    hourValue = pad(hour);
    commitTimeChange();
  }

  function handleMinuteBlur() {
    let minute = parseInt(minuteValue, 10);
    if (isNaN(minute)) minute = 0;
    minute = Math.max(0, Math.min(59, minute));
    minuteValue = pad(minute);
    commitTimeChange();
  }

  // ========== Calendar Handlers ==========
  function prevMonth() {
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
  }

  function nextMonth() {
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
  }

  function selectDay(day) {
    const newDate = internalDate ? cloneDate(internalDate) : new Date(1970, 0, 1, 0, 0);
    newDate.setFullYear(viewYear, viewMonth, day);
    
    if (setValue(newDate)) {
      emitEvents();
    }
  }

  function getCalendarDays() {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days = [];
    
    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, isToday: false, isSelected: false });
    }
    
    const today = getToday();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      days.push({
        day,
        isToday: isSameDay(date, today),
        isSelected: internalDate && isSameDay(date, internalDate),
        isDisabled: !isInRange(date, minDate, maxDate)
      });
    }
    
    return days;
  }

  $: calendarDays = getCalendarDays();
  $: calendarDays, viewYear, viewMonth, internalDate; // Recalculate on these changes

  function handleCalendarKeydown(e) {
    const selectableDays = calendarDays.filter(d => d.day !== null && !d.isDisabled);
    if (selectableDays.length === 0) return;

    if (focusedDayIndex < 0) {
      focusedDayIndex = 0;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusedDayIndex = (focusedDayIndex + 1) % selectableDays.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusedDayIndex = (focusedDayIndex - 1 + selectableDays.length) % selectableDays.length;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedDayIndex = Math.min(focusedDayIndex + 7, selectableDays.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedDayIndex = Math.max(focusedDayIndex - 7, 0);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (selectableDays[focusedDayIndex]) {
        selectDay(selectableDays[focusedDayIndex].day);
      }
    }
  }

  // ========== Quick Date Buttons ==========
  function setQuickDate(getDateFn) {
    const quickDate = getDateFn();
    let newDate;
    
    if (internalDate && mode === 'datetime') {
      // Preserve time portion
      newDate = setDatePortion(internalDate, quickDate);
    } else {
      newDate = quickDate;
    }
    
    if (setValue(newDate)) {
      updateViewFromDate();
      emitEvents();
    }
  }

  // ========== Popup Handlers ==========
  function open() {
    if (popup) {
      isPopupOpen = true;
    }
  }

  function close() {
    isPopupOpen = false;
  }

  function togglePopup() {
    isPopupOpen = !isPopupOpen;
  }

  function handleClickOutside(e) {
    if (!popup || !isPopupOpen) return;
    
    // Check if click is outside our component
    if (rootElement && !rootElement.contains(e.target)) {
      close();
    }
  }

  function handleGlobalKeydown(e) {
    if (e.key === 'Escape' && isPopupOpen) {
      close();
    }
  }

  // ========== Form Integration ==========
  // The hidden input syncs the value for form submission

  // Expose methods on the element
  export function getValue() {
    return getCanonicalValue();
  }

  export function fetchDateValue() {
    return getDateValue();
  }

  export function fetchTimeValue() {
    return getTimeValue();
  }

  export function getIsValid() {
    return isValid;
  }
</script>

<div 
  class="aegis-dtp-root"
  class:popup-mode={popup}
  class:invalid={!isValid}
  bind:this={rootElement}
>
  <!-- Hidden input for form submission -->
  {#if name}
    <input type="hidden" {name} value={canonicalValue || ''} />
  {/if}

  {#if popup}
    <!-- Popup trigger -->
    <button
      type="button"
      class="trigger"
      bind:this={triggerElement}
      on:click={togglePopup}
      aria-haspopup="dialog"
      aria-expanded={isPopupOpen}
    >
      {#if canonicalValue}
        {#if showDateUI && showTimeUI}
          {formatDate(internalDate, dateFormat)} {formatTime(internalDate, timeFormat)}
        {:else if showDateUI}
          {formatDate(internalDate, dateFormat)}
        {:else}
          {formatTime(internalDate, timeFormat)}
        {/if}
      {:else}
        <span class="placeholder">Select {mode}</span>
      {/if}
    </button>
  {/if}

  <!-- Main content (inline or popup panel) -->
  {#if !popup || isPopupOpen}
    <div 
      class="panel" 
      class:popup-panel={popup}
      bind:this={popupElement}
      role={popup ? 'dialog' : undefined}
      aria-modal={popup ? 'true' : undefined}
    >
      <!-- Date UI -->
      {#if showDateUI}
        <div class="date-section">
          <!-- Date input field -->
          <div class="input-row">
            <input
              type="text"
              class="date-input"
              class:invalid={dateInputInvalid}
              bind:value={dateInputValue}
              on:blur={handleDateInputBlur}
              on:keydown={handleDateInputKeydown}
              placeholder={dateFormat}
              aria-label="Date"
              aria-invalid={dateInputInvalid}
            />
          </div>

          <!-- Calendar navigation -->
          <div class="calendar-nav">
            <button type="button" class="nav-btn" on:click={prevMonth} aria-label="Previous month">
              &lt;
            </button>
            <span class="month-year">{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <button type="button" class="nav-btn" on:click={nextMonth} aria-label="Next month">
              &gt;
            </button>
          </div>

          <!-- Calendar grid -->
          <div 
            class="calendar" 
            role="grid" 
            aria-label="Calendar"
            bind:this={calendarGrid}
            on:keydown={handleCalendarKeydown}
            tabindex="0"
          >
            <div class="weekdays" role="row">
              {#each WEEKDAY_NAMES as day}
                <span class="weekday" role="columnheader">{day}</span>
              {/each}
            </div>
            <div class="days">
              {#each calendarDays as { day, isToday, isSelected, isDisabled }, i}
                {#if day === null}
                  <span class="day empty" role="gridcell"></span>
                {:else}
                  <button
                    type="button"
                    class="day"
                    class:today={isToday}
                    class:selected={isSelected}
                    class:disabled={isDisabled}
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    aria-disabled={isDisabled}
                    disabled={isDisabled}
                    on:click={() => selectDay(day)}
                    tabindex="-1"
                  >
                    {day}
                  </button>
                {/if}
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <!-- Time UI -->
      {#if showTimeUI}
        <div class="time-section">
          <div class="input-row">
            <input
              type="text"
              class="time-input"
              class:invalid={timeInputInvalid}
              bind:value={timeInputValue}
              on:blur={handleTimeInputBlur}
              on:keydown={handleTimeInputKeydown}
              placeholder={timeFormat}
              aria-label="Time"
              aria-invalid={timeInputInvalid}
            />
          </div>

          <div class="time-controls">
            <div class="time-field">
              <button type="button" class="spinner-btn" on:click={() => adjustHour(1)} aria-label="Increase hour">+</button>
              <input
                type="text"
                class="time-value"
                bind:value={hourValue}
                on:keydown={handleHourKeydown}
                on:blur={handleHourBlur}
                aria-label="Hour"
                maxlength="2"
              />
              <button type="button" class="spinner-btn" on:click={() => adjustHour(-1)} aria-label="Decrease hour">−</button>
            </div>
            <span class="time-separator">:</span>
            <div class="time-field">
              <button type="button" class="spinner-btn" on:click={() => adjustMinute(1)} aria-label="Increase minute">+</button>
              <input
                type="text"
                class="time-value"
                bind:value={minuteValue}
                on:keydown={handleMinuteKeydown}
                on:blur={handleMinuteBlur}
                aria-label="Minute"
                maxlength="2"
              />
              <button type="button" class="spinner-btn" on:click={() => adjustMinute(-1)} aria-label="Decrease minute">−</button>
            </div>
            {#if hasAmPm}
              <button type="button" class="ampm-btn" on:click={toggleAmPm} aria-label="Toggle AM/PM">
                {ampmValue}
              </button>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Quick date buttons -->
      {#if showQuickDates}
        <div class="quick-dates">
          <button type="button" class="quick-btn" on:click={() => setQuickDate(getYesterday)}>Yesterday</button>
          <button type="button" class="quick-btn" on:click={() => setQuickDate(getToday)}>Today</button>
          <button type="button" class="quick-btn" on:click={() => setQuickDate(getNextMonth)}>Next Month</button>
          <button type="button" class="quick-btn" on:click={() => setQuickDate(getNextYear)}>Next Year</button>
        </div>
      {/if}

      <!-- Validation message -->
      {#if !isValid && validationMessage}
        <div class="validation-message" role="alert">
          {validationMessage}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* CSS Custom Properties for theming */
  :host {
    --aegis-dtp-bg: #ffffff;
    --aegis-dtp-text: #1a1a2e;
    --aegis-dtp-accent: #3b82f6;
    --aegis-dtp-hover-bg: #dbeafe;
    --aegis-dtp-border-radius: 6px;
    --aegis-dtp-border: #cbd5e1;
    --aegis-dtp-invalid: #ef4444;
    
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
  }

  .aegis-dtp-root {
    background: var(--aegis-dtp-bg);
    color: var(--aegis-dtp-text);
    border-radius: var(--aegis-dtp-border-radius);
  }

  .aegis-dtp-root.invalid {
    outline: 2px solid var(--aegis-dtp-invalid);
  }

  /* Popup mode trigger */
  .trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: var(--aegis-dtp-border-radius);
    background: var(--aegis-dtp-bg);
    color: var(--aegis-dtp-text);
    cursor: pointer;
    min-width: 150px;
    text-align: left;
    font-size: 14px;
  }

  .trigger:hover {
    background: var(--aegis-dtp-hover-bg);
  }

  .trigger .placeholder {
    color: #94a3b8;
  }

  /* Panel (content area) */
  .panel {
    padding: 12px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: var(--aegis-dtp-border-radius);
    background: var(--aegis-dtp-bg);
  }

  .popup-panel {
    position: absolute;
    z-index: 1000;
    margin-top: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .popup-mode {
    position: relative;
  }

  /* Input rows */
  .input-row {
    margin-bottom: 12px;
  }

  .date-input,
  .time-input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: var(--aegis-dtp-border-radius);
    font-size: 14px;
    box-sizing: border-box;
    color: var(--aegis-dtp-text);
    background: var(--aegis-dtp-bg);
  }

  .date-input:focus,
  .time-input:focus {
    outline: none;
    border-color: var(--aegis-dtp-accent);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .date-input.invalid,
  .time-input.invalid {
    border-color: var(--aegis-dtp-invalid);
  }

  /* Calendar navigation */
  .calendar-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .nav-btn {
    padding: 4px 10px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: var(--aegis-dtp-border-radius);
    background: var(--aegis-dtp-bg);
    color: var(--aegis-dtp-accent);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }

  .nav-btn:hover {
    background: var(--aegis-dtp-hover-bg);
  }

  .month-year {
    font-weight: 600;
    color: var(--aegis-dtp-text);
  }

  /* Calendar grid */
  .calendar {
    width: 100%;
  }

  .calendar:focus {
    outline: 2px solid var(--aegis-dtp-accent);
    outline-offset: 2px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-bottom: 4px;
  }

  .weekday {
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    padding: 4px 0;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--aegis-dtp-border-radius);
    background: transparent;
    color: var(--aegis-dtp-text);
    cursor: pointer;
    font-size: 13px;
    min-width: 32px;
    min-height: 32px;
  }

  .day:hover:not(.disabled):not(.selected) {
    background: var(--aegis-dtp-hover-bg);
  }

  .day.empty {
    cursor: default;
  }

  .day.today {
    border: 2px solid var(--aegis-dtp-accent);
  }

  .day.selected {
    background: var(--aegis-dtp-accent);
    color: white;
  }

  .day.disabled {
    color: #cbd5e1;
    cursor: not-allowed;
  }

  /* Date section spacing */
  .date-section {
    margin-bottom: 12px;
  }

  /* Time section */
  .time-section {
    border-top: 1px solid var(--aegis-dtp-border);
    padding-top: 12px;
    margin-bottom: 12px;
  }

  .time-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .time-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .spinner-btn {
    width: 32px;
    height: 24px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: 4px;
    background: var(--aegis-dtp-bg);
    color: var(--aegis-dtp-accent);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner-btn:hover {
    background: var(--aegis-dtp-hover-bg);
  }

  .time-value {
    width: 40px;
    text-align: center;
    padding: 6px 4px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    color: var(--aegis-dtp-text);
    background: var(--aegis-dtp-bg);
  }

  .time-value:focus {
    outline: none;
    border-color: var(--aegis-dtp-accent);
  }

  .time-separator {
    font-size: 20px;
    font-weight: bold;
    color: var(--aegis-dtp-text);
    padding: 0 4px;
    align-self: center;
  }

  .ampm-btn {
    padding: 6px 10px;
    border: 1px solid var(--aegis-dtp-border);
    border-radius: 4px;
    background: var(--aegis-dtp-accent);
    color: white;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    margin-left: 8px;
    align-self: center;
  }

  .ampm-btn:hover {
    opacity: 0.9;
  }

  /* Quick date buttons */
  .quick-dates {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    border-top: 1px solid var(--aegis-dtp-border);
    padding-top: 12px;
  }

  .quick-btn {
    flex: 1;
    min-width: 80px;
    padding: 6px 8px;
    border: 1px solid var(--aegis-dtp-accent);
    border-radius: var(--aegis-dtp-border-radius);
    background: var(--aegis-dtp-bg);
    color: var(--aegis-dtp-accent);
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }

  .quick-btn:hover {
    background: var(--aegis-dtp-accent);
    color: white;
  }

  /* Validation message */
  .validation-message {
    margin-top: 8px;
    padding: 6px 8px;
    background: #fef2f2;
    border: 1px solid var(--aegis-dtp-invalid);
    border-radius: 4px;
    color: var(--aegis-dtp-invalid);
    font-size: 12px;
  }
</style>
