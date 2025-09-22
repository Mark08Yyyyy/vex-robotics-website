const Activities = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-apple-gray-900 dark:text-white mb-6">
            活动展示
          </h1>
          <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            探索我们丰富多彩的机器人活动和竞赛成果
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Activity Card 1 */}
          <div className="card overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="h-48 bg-gradient-to-br from-apple-blue to-purple-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-20">VEX</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
                VEX机器人世界锦标赛
              </h3>
              <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-4">
                参加全球最大的机器人竞赛，与世界各地的优秀团队同台竞技
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-apple-blue font-medium">2024年3月</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  获奖
                </span>
              </div>
            </div>
          </div>

          {/* Activity Card 2 */}
          <div className="card overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-20">WORKSHOP</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
                机器人编程工作坊
              </h3>
              <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-4">
                定期举办编程培训，从基础到高级，帮助成员提升技术能力
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-apple-blue font-medium">每月举办</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  进行中
                </span>
              </div>
            </div>
          </div>

          {/* Activity Card 3 */}
          <div className="card overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-20">DEMO</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-2">
                科技节展示
              </h3>
              <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-4">
                在学校科技节上展示我们的机器人作品，与全校师生分享成果
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-apple-blue font-medium">2024年5月</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  即将开始
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activities