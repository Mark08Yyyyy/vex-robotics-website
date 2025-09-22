const About = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-apple-gray-900 dark:text-white mb-6">
            关于我们
          </h1>
          <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            VEX机器人社团成立于2021年，致力于培养学生的科技创新能力和团队协作精神
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-apple-gray-900 dark:text-white mb-6">
              我们的使命
            </h2>
            <p className="text-apple-gray-600 dark:text-apple-gray-300 mb-6">
              通过VEX机器人竞赛平台，为学生提供实践学习的机会，培养他们的工程思维、编程能力和创新精神。我们相信每个学生都有无限的潜力，只需要正确的引导和平台。
            </p>
            <p className="text-apple-gray-600 dark:text-apple-gray-300">
              我们不仅仅是一个技术社团，更是一个充满活力的学习社区，在这里，学生们可以自由探索、大胆创新，在失败中学习，在成功中成长。
            </p>
          </div>
          <div className="bg-apple-gray-100 dark:bg-apple-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-apple-gray-900 dark:text-white mb-4">
              核心价值观
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-apple-blue rounded-full"></div>
                <span className="text-apple-gray-600 dark:text-apple-gray-300">创新思维，勇于探索</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-apple-gray-600 dark:text-apple-gray-300">团队协作，共同成长</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-apple-gray-600 dark:text-apple-gray-300">实践学习，知行合一</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-apple-gray-600 dark:text-apple-gray-300">追求卓越，永不止步</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-apple-gray-900 dark:text-white mb-12">
            发展历程
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-apple-blue rounded-full flex items-center justify-center text-white font-bold">
                  2021
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white">社团成立</h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300">由一群热爱机器人技术的学生发起成立</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  2022
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white">首次参赛</h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300">参加VEX机器人世界锦标赛，获得优秀表现</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  2023
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white">快速发展</h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300">成员数量增长到50+，获得多项竞赛奖项</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  2024
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white">持续创新</h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300">建立完善的培训体系，培养更多优秀人才</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About