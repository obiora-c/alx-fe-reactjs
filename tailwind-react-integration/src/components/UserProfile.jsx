function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl ">
      <img src="https://via.placeholder.com/150" className="sm:w-24 h-24 md:w-36  rounded-full md:h-36 mx-auto  hover:scale-110  transition-transform duration-300 ease-in-out" alt="User" />
      <h1 className="text-xl  text-blue-800 my-4 sm:text-lg md:text-xl hover:text-blue-500 md:p-8 sm:p-6">John Doe</h1>
      <p className="text-gray-600  text-base sm:text-sm md:text-base sm:p-4 md:p-8">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;