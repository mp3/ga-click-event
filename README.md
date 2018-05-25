## Installation

```
yarn add ga-click-event
```

## Usage

### HTML

```
<div data-analytics="category,label">Send click event to Google Analytics</div>
```

### TypeScript / JavaScript

```
import GAClickEvent from 'ga-click-event'
const gaClickEvent = new GAClickEvent()

# update tracking
gaClickEvent.updateEvents()
```
