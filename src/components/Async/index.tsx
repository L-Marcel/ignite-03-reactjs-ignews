import { useEffect, useState } from "react";

//Esse componente foi criado para fins didáticos
export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if(isButtonVisible) {
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 3000);
    };
  }, [isButtonVisible]);

  return (
    <div>
      <h1>Hello World!</h1>
      { isButtonVisible && <button>button</button>}
    </div>
  );
};