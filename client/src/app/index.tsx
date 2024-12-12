import { Pages } from '@/pages';
import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';
function App() {
  // async function getAccount() {
  //   if (window.ethereum) {
  //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     console.log('Connected account:', accounts[0]);
  //   }
  // }

  // useEffect(() => {
  //   getAccount();
  // }, []);

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Pages />
      </div>
    </div>
  );
}

export default App;
