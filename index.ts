declare const ga: any

export default class GAClickEvent {
  private trackingItems: NodeList

  constructor() {
    this.trackingItems = document.querySelectorAll('[data-analytics]')
    if (!this.trackingItems.length) return

    this.setEvents()
  }
  
  public updateEvents() {
    this.trackingItems = document.querySelectorAll('[data-analytics]')
    if (!this.trackingItems.length) return

    Array.from(this.trackingItems).forEach(item => {
      item.removeEventListener('click', event => this.sendClickEvent(event))
      item.addEventListener('click', event => this.sendClickEvent(event))
    })
  }

  private setEvents() {
    Array.from(this.trackingItems).forEach(item => {
      item.addEventListener('click', event => this.sendClickEvent(event))
    })
  }

  private sendClickEvent(event: Event) {
    if (!('ga' in window)) return

    event.preventDefault()

    const target = event.currentTarget as HTMLAnchorElement
    const params = target.getAttribute('data-analytics') as string
    const category = params.split(',')[0] || ''
    const label = params.split(',')[1] || ''

    if (category && label) {
      ga('send', 'event', category, 'click', label)
    }

    if (target.href) {
      this.openLink(target)
    }
  }

  private openLink(element: HTMLAnchorElement) {
    if (element.target === '_blank') {
      window.open(element.href)
    } else {
      location.href = element.href
    }
  }
}
