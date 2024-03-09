// File: client/encode-front-end/src/views/login.tsx
// This file contains login view
// Importing necessary modules

// Defining Login component (TypeScript)
const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-16 rounded shadow-2xl w-1/3">
        <h2 className="text-3xl font-bold mb-10 text-center">Login</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email Address</label>
            <input type="email" name="email" id="email" placeholder="" className="w-full p-3 rounded border border-gray-300" />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Password</label>
                <input type="password" name="password" id="password" placeholder="" className="w-full p-3 rounded border border-gray-300" />
            </div>
            <div className="mb-6">
                <button type="submit" className="w-full py-3 rounded bg-blue-500 text-white hover:bg-blue-600">Login</button>
            </div>
        </form>
        </div>
    </div>
    );
}

export default Login;