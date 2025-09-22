const Contact = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-apple-gray-900 dark:text-white mb-6">
            联系我们
          </h1>
          <p className="text-xl text-apple-gray-600 dark:text-apple-gray-300 max-w-3xl mx-auto">
            有任何问题或想要加入我们？随时与我们取得联系
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-apple-gray-900 dark:text-white mb-6">
              发送消息
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-apple-gray-300 dark:border-apple-gray-600 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-apple-gray-300 dark:border-apple-gray-600 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white"
                  placeholder="请输入您的邮箱地址"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                  主题
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-apple-gray-300 dark:border-apple-gray-600 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white"
                  placeholder="请输入消息主题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                  消息内容
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-apple-gray-300 dark:border-apple-gray-600 rounded-lg focus:ring-2 focus:ring-apple-blue focus:border-transparent bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white resize-none"
                  placeholder="请输入您想要发送的消息..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                发送消息
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                联系方式
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-apple-blue rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📧</span>
                  </div>
                  <div>
                    <p className="font-medium text-apple-gray-900 dark:text-white">邮箱</p>
                    <p className="text-apple-gray-600 dark:text-apple-gray-300">robotics@school.edu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">💬</span>
                  </div>
                  <div>
                    <p className="font-medium text-apple-gray-900 dark:text-white">微信群</p>
                    <p className="text-apple-gray-600 dark:text-apple-gray-300">扫码加入官方群聊</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-apple-gray-900 dark:text-white">活动地点</p>
                    <p className="text-apple-gray-600 dark:text-apple-gray-300">学校科技楼 3F 机器人实验室</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                活动时间
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-apple-gray-600 dark:text-apple-gray-300">周三</span>
                  <span className="font-medium text-apple-gray-900 dark:text-white">16:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-apple-gray-600 dark:text-apple-gray-300">周六</span>
                  <span className="font-medium text-apple-gray-900 dark:text-white">14:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-apple-gray-600 dark:text-apple-gray-300">周日</span>
                  <span className="font-medium text-apple-gray-900 dark:text-white">09:00 - 12:00</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                关注我们
              </h3>
              <div className="flex space-x-4">
                <button className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-white font-bold">B</span>
                </button>
                <button className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                  <span className="text-white font-bold">微</span>
                </button>
                <button className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <span className="text-white font-bold">小</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact