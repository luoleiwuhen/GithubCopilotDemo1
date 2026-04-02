# 在Podfile顶部添加更强制的HTTP2禁用，主要修复打包机在cdn源情况下报HTTP2错误导致库下载失败
ENV['COCOAPODS_DISABLE_HTTP2'] = '1'
ENV['COCOAPODS_CURL_OPTIONS'] = '--http1.1'
ENV['COCOAPODS_DOWNLOADER_DISABLE_HTTP2'] = 'true'

#source 'https://github.com/CocoaPods/Specs.git'
source 'ssh://git@code.yalla.live:23596/common/archives/specs.git'
source 'ssh://git@code.yalla.live:23596/chat/ios/muslimspecs.git'
source 'https://cdn.cocoapods.org/'

platform :ios, '13.0'
use_frameworks! :linkage => :static
inhibit_all_warnings!

workspace 'YallaAthan.xcworkspace'

plugin 'cocoapods-pod-linkage'

eval(File.open('PodDevExtension.rb').read) if File.exist? 'PodDevExtension.rb'

##################################################################

# 主工程依赖的三方库
def pods_YallaAthan
  # - Note: Debug
  pod 'SwiftLint', '= 0.46.2', configurations: ['Debug', 'DebugMain']  # Swift 代码规范检查工具
  pod 'LookinServer', configurations: ['Debug', 'DebugMain'], inhibit_warnings: true   # UI 调试工具

  #  pod 'AMLeaksFinder', :git => 'ssh://git@code.yalla.live:23596/chat/ios/YLBaseComponent/AMLeaksFinder.git', inhibit_warnings: true, :branch => 'develop', configurations: ['Debug', 'DebugMain']
end

##################################################################

# ServiceKit: 服务层，作为Module层和基础组件层的桥接层，与业务耦合

# ServiceKit依赖的三方静态库
def pods_ServiceKit_onlyStaticLibrary
  # - Note: Foundation
  pod 'DataCompression', '= 3.8.0'            # 数据压缩库
  pod 'AppsFlyerFramework', '= 6.16.0'        # 应用分析工具
  pod 'DifferenceKit', '= 1.2.0'              # 数据差异比较库
  pod 'SSZipArchive', '= 2.4.3'               # ZIP 压缩解压库
  pod 'MMKV', '= 1.3.13', inhibit_warnings: true # 高性能键值存储
  pod 'MMKVCore', '= 1.3.13'
  
  pod 'NetDiag-Static', '= 0.2.4' # https://code.yalla.live/common/archives/netdiag
  
  pod 'YLJSON', '= 1.0.0'
  pod 'JSBridge', '= 1.2.1'

  # - Note: Analytics & Crashlytics (buildSetting: ${PODS_ROOT}/Firebase/CoreOnly/Sources)
  pod 'FirebaseAnalytics', '= 11.15.0' # https://github.com/firebase/firebase-ios-sdk
  pod 'FirebaseCrashlytics', '= 11.15.0'     # https://github.com/firebase/firebase-ios-sdk
  pod 'FirebaseRemoteConfig', '= 11.15.0'     # https://github.com/firebase/firebase-ios-sdk
  pod 'Adjust', '= 5.4.4'
  pod 'Adjust/AdjustGoogleOdm'

  # - Note: UI
  pod 'MJRefresh', '= 3.7.9'                  # 下拉刷新组件
  pod 'SVGKit', '= 3.0.0'                     # SVG 渲染库
  pod 'lottie-ios', '= 4.5.1'                 # 动画渲染库
  pod 'YYEVA', '= 1.1.36'                     # 视频特效库
  pod 'IQKeyboardManagerSwift', '= 6.5.9', inhibit_warnings: true # 键盘管理
  
  pod 'Kingfisher', '= 8.2.0'                # 图片加载和缓存
  
  # - Note: Downloader
  pod 'AliyunOSSiOS', '= 2.11.0', :inhibit_warnings => true # https://github.com/aliyun/aliyun-oss-ios-sdk
#
  pod 'YLDownloader', '= 1.0.7'

  pod 'MediaProcessor', '= 1.0.1'
  # - Note: database
  pod 'YLCoreKit/YLDatabase', '= 2.5.4'

  # 数据库 FTS & SQLCipher
  # link SQLCipher https://discuss.zetetic.net/t/important-advisory-sqlcipher-with-xcode-8-and-new-sdks/1688
  pod 'GRDB', '= 7.9.0'
  
  # - Note: InApp-Purchase
  pod 'Maneki', '1.1.3'
#  pod 'Maneki', :git => 'ssh://git@code.yalla.live:23596/chat/ios/YLBaseComponent/YLStorekit.git', :branch => 'feature/wzb/dev'

  #  # Google 广告
  #  pod 'Google-Mobile-Ads-SDK', '= 12.1.0'
  # https://help.toponad.net/cn/docs/Google-UMP-shi-pei-shi-yong-zhi-nan-YfV6
  #  pod 'GoogleUserMessagingPlatform', '= 2.7.0'
  
  # Google 登录
  pod 'GoogleSignIn', '= 7.1.0'
  
  # 调试工具相关
  pod 'Sleuth', '= 10.0.4', configurations: ['Debug', 'DebugMain', 'Release']
end

# ServiceKit依赖的三方动态库
def pods_ServiceKit_onlyDynamicLibrary
  # - Note: Foundation
  pod 'SwiftProtobuf', '= 1.26.0'           # Protocol Buffers
  pod 'Crypto', '= 0.3.3'                   # 加密库
  pod 'FlyingFish', '= 0.5.10'              # 网络库
  pod 'Sailfish', '= 2.4.1'                 # 网络库
  pod 'CoralBase', '= 0.2.22'
  pod 'CoralUtil', '= 0.2.22'
  
  # https://github.com/facebook/facebook-ios-sdk
  pod 'FBAEMKit', '= 18.0.0'
  pod 'FBSDKCoreKit', '= 18.0.0'
  pod 'FBSDKLoginKit', '= 18.0.0'
  pod 'FBSDKShareKit', '= 18.0.0'

  pod 'TreasureBox', '= 1.3.2'

  # pod 'AthanAds/Full' 带模拟器架构的 :git => 'ssh://git@code.yalla.live:23596/chat/ios/YLBusinessComponent/AthanAds.git',
  pod 'AthanAds/Full', '= 1.0.5', :linkage => :dynamic

  # NSE&We Server层
#  pod 'AthanExtServer', :git => 'ssh://git@code.yalla.live:23596/chat/ios/YLBusinessComponent/AthanExtServer.git', :branch => 'feature/sailfish_upgrade'
  pod 'AthanExtServer', '= 1.3.2'
end

##################################################################

abstract_target 'YallaAthan' do
  target 'YallaAthan' do
    project 'YallaAthan/YallaAthan.xcodeproj'
    pods_YallaAthan
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'YallaAthanNSE' do
    project 'YallaAthan/YallaAthan.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'YallaAthanWE' do
    project 'YallaAthan/YallaAthan.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'ModuleManager' do
    project 'BusinessModule/ModuleManager/ModuleManager.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
    pod 'SecurityDetection-Static', '= 0.1.18' # https://code.yalla.live/common/archives/securitydetection # 安全分析工具，只允许能主工程依赖，Extension依赖会导致Xcode16.4以上Compiler无法编译通过
  end
  
  target 'AthanModule' do
    project 'BusinessModule/AthanModule/AthanModule.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'UmmahModule' do
    project 'BusinessModule/UmmahModule/UmmahModule.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'QuranModule' do
    project 'BusinessModule/QuranModule/QuranModule.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'MessageModule' do
    project 'BusinessModule/MessageModule/MessageModule.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'MeModule' do
    project 'BusinessModule/MeModule/MeModule.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end

  target 'YamiModule' do
    project 'BusinessModule/YamiModule/YamiModule.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end

  target 'AthanMessaging' do
    project 'Messaging/AthanMessaging/AthanMessaging.xcodeproj'
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'AthanServiceKit' do
    project 'ServiceKit/AthanServiceKit/AthanServiceKit.xcodeproj'
    pods_ServiceKit_onlyStaticLibrary
    pods_ServiceKit_onlyDynamicLibrary
  end
  
  target 'AthanBaseKit' do
    project 'BaseKit/AthanBaseKit/AthanBaseKit.xcodeproj'
  end
end

pre_install do |installer|
  dynamicFrameworks = Array['SwiftProtobuf', 'Widgets', 'TreasureBox', 'AthanAds', 'AthanExtServer']
  installer.pod_targets.each do |pod|
    if dynamicFrameworks.include?(pod.name) and pod.build_as_static_framework?
      def pod.build_as_static_framework?
      false
      end
      def pod.build_as_dynamic_framework?
      true
      end
    end
  end
end


post_install do |installer|
  # 1. 配置 Pod Targets
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      next if target.name == 'AthanAds'  # 跳过 AthanAds
      # 通用构建设置
      config.build_settings['ENABLE_BITCODE'] = 'NO'  #Apple 已不强制要求 Bitcode，禁用可避免因 Bitcode 符号化导致的构建失败（如三方库不支持 Bitcode）
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'  # 设置最低支持的 iOS 版本
      config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'  # 禁止代码签名，避免签名冲突
      config.build_settings['STRIP_INSTALLED_PRODUCT'] = 'YES'  # 启用产品剥离，减小最终包大小
      config.build_settings['ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES'] = 'NO'  # 不嵌入 Swift 标准库，减小包大小
      config.build_settings['SWIFT_COMPILATION_MODE'] = 'wholemodule'  # 使用全模块编译模式，提高编译速度
      config.build_settings['DEAD_CODE_STRIPPING'] = 'YES'  # 启用死代码剥离，减小包大小
      config.build_settings['ASSETCATALOG_COMPILER_OPTIMIZATION'] = 'space'  # 优化资源目录，减小包大小
      config.build_settings['OTHER_CFLAGS'] = ['-flto=thin']  # 启用链接时优化，提高性能
      config.build_settings['OTHER_LDFLAGS'] = ['-flto=thin']  # 启用链接时优化，提高性能
      config.build_settings['SWIFT_STDLIB_SUPPORT_BACK_DEPLOYMENT'] = 'NO'  # 禁用 Swift 标准库向后部署支持，减小包大小 (Swift 标准库的向后兼容支持仅对 iOS 12 及以下有效）
      
      
      
      # Debug 配置
      if config.name == 'Debug' || config.name == 'DebugMain'
        config.build_settings['SWIFT_OPTIMIZATION_LEVEL'] = '-Onone'  # 禁用 Swift 优化，便于调试
        config.build_settings['GCC_OPTIMIZATION_LEVEL'] = '0'  # 禁用 GCC 优化，便于调试
        config.build_settings['COPY_PHASE_STRIP'] = 'NO'  # 禁用复制阶段剥离，保留调试符号
        config.build_settings['DEPLOYMENT_POSTPROCESSING'] = 'NO'  # 禁用部署后处理，保留调试信息
        config.build_settings['GCC_GENERATE_DEBUGGING_SYMBOLS'] = 'YES'  # 生成调试符号，便于调试
      else
        # Release 配置
        config.build_settings['SWIFT_OPTIMIZATION_LEVEL'] = '-Osize'  # 启用 Swift 大小优化，减小包大小
        config.build_settings['GCC_OPTIMIZATION_LEVEL'] = 's'   # GCC 的 -Os（优化大小）
        config.build_settings['COPY_PHASE_STRIP'] = 'YES'  # 启用复制阶段剥离，减小包大小
        config.build_settings['DEPLOYMENT_POSTPROCESSING'] = 'YES'  # 启用部署后处理，优化发布版本
        config.build_settings['GCC_GENERATE_DEBUGGING_SYMBOLS'] = 'NO'  # 不生成调试符号，减小包大小
        config.build_settings['STRIP_STYLE'] = 'non-global'  # 使用非全局符号剥离，减小包大小
        config.build_settings['SWIFT_LTO'] = 'thin'
      end
      
      # SwiftProtobuf 特殊处理
      if target.name == 'SwiftProtobuf'
        config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'  # 开启此选项会生成与 Swift 版本无关的 ABI（适用于需要分发给多个 Swift 版本用户的二进制 SDK）副作用：增加二进制体积（约 5%~10%），降低编译速度
      end
    end
  end
  
  # 2. 配置主工程（需要 xcodeproj gem）- 包体积优化
  require 'xcodeproj'
  main_projects = [
  'YallaAthan/YallaAthan.xcodeproj',
  'BusinessModule/ModuleManager/ModuleManager.xcodeproj',
  'BusinessModule/AthanModule/AthanModule.xcodeproj',
  'BusinessModule/UmmahModule/UmmahModule.xcodeproj',
  'BusinessModule/QuranModule/QuranModule.xcodeproj',
  'BusinessModule/YamiModule/YamiModule.xcodeproj',
  'BusinessModule/MessageModule/MessageModule.xcodeproj',
  'BusinessModule/MeModule/MeModule.xcodeproj',
  'Messaging/AthanMessaging/AthanMessaging.xcodeproj',
  'ServiceKit/AthanServiceKit/AthanServiceKit.xcodeproj',
  'BaseKit/AthanBaseKit/AthanBaseKit.xcodeproj'
  ]
  main_projects.each do |project_path|
    next unless File.exist?(project_path)
    
    project = Xcodeproj::Project.open(project_path)
    project.targets.each do |target|
      target.build_configurations.each do |config|
        # 通用设置
        config.build_settings['SWIFT_COMPILATION_MODE'] = 'wholemodule'
        config.build_settings['DEAD_CODE_STRIPPING'] = 'YES'
        config.build_settings['STRIP_INSTALLED_PRODUCT'] = 'YES'
        
        # 优化级别
        if config.name == 'Debug' || config.name == 'DebugMain'
          config.build_settings['SWIFT_OPTIMIZATION_LEVEL'] = '-Onone'
          config.build_settings['GCC_OPTIMIZATION_LEVEL'] = '0'
        else
          config.build_settings['SWIFT_OPTIMIZATION_LEVEL'] = '-Osize'
          config.build_settings['GCC_OPTIMIZATION_LEVEL'] = 's'
          config.build_settings['SWIFT_LTO'] = 'thin'
          config.build_settings['STRIP_STYLE'] = 'non-global'
        end
      end
    end
    project.save
  end
end
