const initMocks = async () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { server } = await require('./server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await require('./browser');
    worker.start({ onUnhandledRequest: 'bypass' });
  }
};

export default initMocks;
