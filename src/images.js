function generateImage() {
    const prompt = document.getElementById('promptInput').value.trim();
    const width = parseInt(document.getElementById('widthInput').value) || 1024;
    const height = parseInt(document.getElementById('heightInput').value) || 1024;
    const seed = parseInt(document.getElementById('seedInput').value) || 100;

    if (!prompt) {
        alert('请输入图片描述！');
        return;
    }

    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;

    const imgElement = document.getElementById('generatedImage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // 显示加载动画
    loadingSpinner.style.display = 'flex';
    imgElement.style.display = 'none';

    const img = new Image();
    img.onload = function() {
        imgElement.src = this.src;
        imgElement.alt = prompt;
        imgElement.style.display = 'block';

        // 隐藏加载动画
        loadingSpinner.style.display = 'none';

        // 显示保存按钮
        document.querySelector('.save-button').style.display = 'inline-block';
    };
    img.onerror = function() {
        alert('图片生成失败，请重试！');
        loadingSpinner.style.display = 'none';
    };
    img.src = imageUrl;
}

function saveImage() {
    const imgElement = document.getElementById('generatedImage');
    if (!imgElement.src) {
        alert('请先生成图片！');
        return;
    }

    const link = document.createElement('a');
    link.href = imgElement.src;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}