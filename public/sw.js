self.addEventListener('push', (event) => {
    let data = { title: 'Notification', body: '' };
    if (event.data) {
      try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
    }
  
    const options = {
      body: data.body,
      icon: '/icon.png',
      data: { url: data.url || '/' }
    };
  
    event.waitUntil(self.registration.showNotification(data.title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
        for (const client of windowClients) {
          if ('focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
    );
  });
  