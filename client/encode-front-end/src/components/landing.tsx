import React from "react";

const Landing: React.FC = () => {
  return (
    <div>
      <div className="grid grid grid-cols-3 bg-gray-900 py-4 w-full">
        <div className="leftSide py-10 grid-span-4">
          <h1 className="leading-[4rem] col-span-2 text-6xl font-[satoshi] font-bold text-white pt-10 pb-6 pl-12 ">
            Moderate your chat with AI and Analytics
          </h1>
          <h4 className="overflow-auto text-xl font-[satoshi] font-medium text-white pl-12 max-w-100	">
            Our cutting-edge artificial intelligence technology ensures a
            seamless and secure online environment for your community
          </h4>
          <div className="tickBoxes flex items-center pl-12">
            <div className="flex items-center pt-6">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex justify-center ">
                <h1 className="text-4xl font-[satoshi] font-bold text-white">
                  ✓
                </h1>
              </div>
            </div>
            <div className="TEXT  relative top-1 pl-3 text-xl font-[satoshi] font-bold text-white">Using Solana Pay for transparent, low-fee rapid transactions.</div>
          </div>
          <div className="flex items-end pl-12">
          <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex justify-center relative bottom-14">
                <h1 className="text-4xl font-[satoshi] font-bold text-white">
                  ✓
                </h1>
              </div>
            </div>
            <div className="TEXT  pt-5 pl-3 relative top-2 text-xl font-[satoshi] font-bold text-white">AI that evolves with the dynamics of your community, ensuring precise and efficient moderation without the need for manual intervention.</div>
        </div>
          
          </div>
        <div className="RightSide col-span-2 flex justify-center">
          <img className="w-400 h-400" src="./src/assets/ai-hub-svgrepo-com.svg" alt="src" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
