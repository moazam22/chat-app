import { ChakraProvider } from '@chakra-ui/react';
import AppContainer from './Components/AppContainer/AppContainer';
import GlobalProvider from './Context/GlobalProvider';

function App() {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <AppContainer />
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default App;
