<div x-data="{ show: true }" class="fixed top-6 right-6 z-50">
    @if (session('success'))
    <div id="toast-success" x-show="show" x-init="setTimeout(() => show = false, 5000)" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <i class="fas fa-check"></i>
        </div>
        <div class="ml-3 text-sm font-normal">{{ session('success') }}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" aria-label="Close" x-on:click="show = false">
            <i class="fas fa-times"></i>
        </button>
    </div>
    @elseif (session('error'))
    <div id="toast-error" x-show="show" x-init="setTimeout(() => show = false, 5000)" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
            <i class="fas fa-check"></i>
        </div>
        <div class="ml-3 text-sm font-normal">{{ session('error') }}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" aria-label="Close" x-on:click="show = false">
            <i class="fas fa-times"></i>
        </button>
    </div>
    @endif
</div>
<script defer>
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelector('[x-on\\:click]').addEventListener("click", function() {
            document.querySelector('#toast-success').style.display = 'none';
        });
    });
</script>
