import Vue from 'vue'
import SvgIcon from './SvgIcon';

Vue.component('svg-icon', SvgIcon);

/**
 * require.context(dir, isForSubdir, rule)：读取指定目录下的所有文件
 * dir - 指定目录
 * isForSubdir - 是否遍历子级目录
 * rule - 用正则表达式定义遍历规则
 */
const dirTraversal = require.context("./svg", false, /\.svg$/);
const dirResult = requireContext => {
    return requireContext.keys().map(requireContext);
}
dirResult(dirTraversal);
