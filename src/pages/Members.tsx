const Members = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-apple-gray-900 dark:text-white mb-6">
            团队成员
          </h1>
          <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            认识我们充满激情的机器人团队成员
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Member Card 1 */}
          <div className="card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-apple-blue to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">张三</span>
            </div>
            <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
              张三
            </h3>
            <p className="text-apple-blue font-medium mb-2">团队队长</p>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm mb-4">
              负责团队整体规划和项目管理，擅长机械设计和团队协调
            </p>
            <div className="flex justify-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                机械设计
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                项目管理
              </span>
            </div>
          </div>

          {/* Member Card 2 */}
          <div className="card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">李四</span>
            </div>
            <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
              李四
            </h3>
            <p className="text-apple-blue font-medium mb-2">编程负责人</p>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm mb-4">
              专注于机器人编程和算法优化，精通C++和Python
            </p>
            <div className="flex justify-center space-x-2">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                编程
              </span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                算法
              </span>
            </div>
          </div>

          {/* Member Card 3 */}
          <div className="card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">王五</span>
            </div>
            <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
              王五
            </h3>
            <p className="text-apple-blue font-medium mb-2">硬件工程师</p>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm mb-4">
              负责电路设计和传感器集成，确保机器人硬件稳定运行
            </p>
            <div className="flex justify-center space-x-2">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                电路设计
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                传感器
              </span>
            </div>
          </div>

          {/* Member Card 4 */}
          <div className="card text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">赵六</span>
            </div>
            <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
              赵六
            </h3>
            <p className="text-apple-blue font-medium mb-2">设计师</p>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm mb-4">
              负责机器人外观设计和用户界面，让技术与美学完美结合
            </p>
            <div className="flex justify-center space-x-2">
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                UI设计
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                外观设计
              </span>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-20 text-center">
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-apple-gray-900 dark:text-white mb-4">
              加入我们
            </h2>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-6">
              如果你对机器人技术充满热情，欢迎加入我们的团队！
            </p>
            <button className="btn-primary">
              申请加入
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members