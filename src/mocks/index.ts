const initMocks = () => {
  const isServer = typeof window === undefined;

  if (isServer) {
    (async () => {
      const { server } = await import('./server');
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import('./browser');
      worker.start();
    })();
  }
};

export default initMocks;
