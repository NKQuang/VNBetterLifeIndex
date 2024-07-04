@extends('dashboard.layout')
@section('content')
    <x-alert />
    <div class="max-w-6xl mx-10 mt-10 mb-10">
        <form action="{{ route('user.update', $user->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div class="sm:col-span-3">
                            <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh</label>
                            <div class="mt-2 flex items-center gap-x-3">
                                <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                        clip-rule="evenodd" />
                                </svg>

                                <button type="button" id="change-image-button"
                                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Thay
                                    đổi ảnh</button>
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Xem
                                trước</label>
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <div id="image-preview" class="hidden">
                                        <img id="preview-img" src="" alt="Image preview" class="w-full h-auto" />
                                    </div>
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600 align-middle content-center">
                                        <label for="file-upload"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                                            <span>Tải lên 1 file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only">
                                        </label>
                                        <p class="pl-1">hoặc kéo và thả vô <em class="text-indigo-600"><b>đây</b></em></p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Thông tin cá nhân</h2>
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Họ và
                                tên</label>
                            <div class="mt-2">
                                <input type="text" name="name" id="name" autocomplete="given-name"
                                    value="{{ $user->name }}"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                @error('name')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Địa chỉ
                                Email</label>
                            <div class="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email"
                                    value="{{ $user->email }}"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                @error('email')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Số điện
                                thoại</label>
                            <div class="mt-2">
                                <input id="phone" name="phone" type="text" autocomplete="phone"
                                    value="{{ $user->phone }}"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                @error('phone')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="regions" class="block text-sm font-medium leading-6 text-gray-900">Tỉnh</label>
                            <div class="mt-2">
                                <select id="regions" name="regions" autocomplete="regions-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-1">
                                    <option selected>Bà Rịa Vũng Tàu</option>
                                </select>
                                @error('regions')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="districts" class="block text-sm font-medium leading-6 text-gray-900">Huyện</label>
                            <div class="mt-2">
                                <select id="districts" name="districts" autocomplete="districts-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-1">
                                    @foreach ($districts as $row)
                                        <option value="{{ $row->id }}">{{ $row->full_name }}</option>
                                    @endforeach
                                </select>
                                @error('districts')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Chức vụ</label>
                            <div class="mt-2">
                                <select id="role" name="role" autocomplete="role"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
                                    @foreach($roles as $roleKey => $roleName)
                                        <option value="{{ $roleKey }}" {{ $user->role == $roleKey ? 'selected' : '' }}>{{ $roleName }}</option>
                                    @endforeach
                                </select>
                                <span class="text-yellow-500 text-xs italic">Lưu ý: Admin không thể tự đổi role của mình</span>
                                @error('role')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Địa chỉ</label>
                            <div class="mt-2">
                                <input type="text" name="address" id="address" value="{{ $user->address }}"
                                    autocomplete="address"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                @error('address')
                                    <span class="text-red-500 text-xs italic">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6 pb-5">
                <button
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600  hover:text-indigo-500">Lưu</button>
                <button
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600  hover:text-indigo-500">Quay
                    lại</button>
            </div>
        </form>
    </div>
@endsection
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var fileInput = document.getElementById('file-upload');
        var output = document.getElementById('preview-img');
        var previewContainer = document.getElementById('image-preview');

        if (fileInput) {
            fileInput.addEventListener('change', function(event) {
                if (event.target.files && event.target.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        output.src = e.target.result;
                        previewContainer.classList.remove('hidden');
                    };

                    reader.readAsDataURL(event.target.files[0]);
                }
            });
        }
    });
    document.addEventListener('DOMContentLoaded', function() {
        var button = document.getElementById('change-image-button');
        var fileInput = document.getElementById('file-upload');

        if (button && fileInput) {
            button.addEventListener('click', function() {
                fileInput.click();
            });
        }
    });
    document.addEventListener('DOMContentLoaded', function() {
        var fileInput = document.getElementById('file-upload');
        var dropArea = document.querySelector(
        '.mt-4'); // This should be more specific if there are multiple elements with the same class
        var previewContainer = document.getElementById('image-preview');
        var previewImage = document.getElementById('preview-img');

        // Function to update the image preview
        function updateImagePreview(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }

        // Handle files from input or drop
        function handleFiles(files) {
            var file = files[0];
            updateImagePreview(file);
        }

        // Input change event to handle files after selection
        fileInput.addEventListener('change', function(event) {
            handleFiles(event.target.files);
        });

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropArea.classList.add('highlight');
        }

        function unhighlight(e) {
            dropArea.classList.remove('highlight');
        }

        // Handle dropped files
        dropArea.addEventListener('drop', function(e) {
            var dt = e.dataTransfer;
            var files = dt.files;

            handleFiles(files);
        });
    });
</script>
