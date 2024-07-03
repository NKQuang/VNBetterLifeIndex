@extends('dashboard.layout')
@section('content')

    <div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
        <div
            class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
                <h6 class="text-lg font-semibold text-white">Cập nhật trọng số</h6>
            </div>
            <div class="flex-auto px-0 pt-0 pb-2">
                <div class="p-6">
                    @if ($errors->any())
                        <div class="mb-4">
                            <div class="font-medium text-red-600">Có lỗi xảy ra!</div>
                            <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('weights.update') }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            @foreach ($weight as $row)
                                <input type="hidden" name="id[]" value="{{ $row->id }}">
                                <div class="p-4 border border-gray-300 rounded-lg shadow-sm">
                                    <div class="mb-4">
                                        <label for="name_{{ $loop->index }}"
                                            class="block text-sm font-medium text-gray-700">Tên</label>
                                        <input type="text" name="name[]" id="name_{{ $loop->index }}"
                                            value="{{ $row->name }}" required
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="mb-4">
                                        <label for="value_{{ $loop->index }}"
                                            class="block text-sm font-medium text-gray-700">Giá trị</label>
                                        <input type="text" name="value[]" id="value_{{ $loop->index }}"
                                            value="{{ $row->value }}" required
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="mb-4">
                                        <label for="indicators_id_{{ $loop->index }}"
                                            class="block text-sm font-medium text-gray-700">Chỉ số</label>
                                        <select name="indicators_id[]" id="indicators_id_{{ $loop->index }}" required
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            @foreach ($indicators as $indicator)
                                                <option value="{{ $indicator->id }}"
                                                    @if ($indicator->id == $row->indicators_id) selected @endif>
                                                    {{ $indicator->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        <div class="mt-4">
                            <button type="submit"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                style="float: inline-end">CẬP NHẬT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection
